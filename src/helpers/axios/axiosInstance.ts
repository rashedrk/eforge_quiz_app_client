import type { IGenericErrorResponse } from "@/types/common";
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

// Define interface for API error response
interface ApiErrorResponse {
    message?: string;
    errorMessages?: Array<{ path: string; message: string }>;
    statusCode?: number;
}

// Create axios instance with default configuration
const axiosInstance = axios.create({
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Helper to read access token from redux-persist storage without importing the store (avoid circular deps)
const getAccessToken = (): string | null => {
    try {
        if (typeof window === "undefined") return null;
        const persistedRoot = localStorage.getItem("persist:root");
        if (!persistedRoot) return null;
        const rootObj = JSON.parse(persistedRoot) as Record<string, string>;
        if (!rootObj.auth) return null;
        const authState = JSON.parse(rootObj.auth) as { accessToken?: string | null };
        return authState?.accessToken ?? null;
    } catch {
        return null;
    }
};

// Request interceptor to add authentication token
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling responses and errors
axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // Return the response data structure as expected
        return response;
    },
    async (error: AxiosError<ApiErrorResponse>) => {
        // const originalRequest = error.config;
        const status = error.response?.status;
        const errorData = error.response?.data;

        // Handle different error status codes
        if (status === 401) {
            // Unauthorized - clear persisted auth and redirect to login
            try {
                if (typeof window !== "undefined") {
                    const storageKey = "persist:root";
                    const persistedRoot = localStorage.getItem(storageKey);
                    if (persistedRoot) {
                        const rootObj = JSON.parse(persistedRoot) as Record<string, string>;
                        // remove only auth slice if possible
                        delete rootObj.auth;
                        localStorage.setItem(storageKey, JSON.stringify(rootObj));
                    }
                }
            } catch {
                // no-op
            }

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        }

        if (status === 403) {
            // Forbidden - user doesn't have permission
            console.error('Access forbidden');
        }

        // For server errors (500)
        if (status && status >= 500) {
            console.error('Server error:', errorData?.message || 'Internal server error');
        }

        // Create standardized error response
        const errorResponse: IGenericErrorResponse = {
            statusCode: status || 500,
            message: errorData?.message || error.message || "Something went wrong!",
            errorMessages: errorData?.errorMessages || [{
                path: '',
                message: errorData?.message || error.message || "Something went wrong!"
            }],
        };

        // Reject with the standardized error format
        return Promise.reject(errorResponse);
    }
);

export { axiosInstance };