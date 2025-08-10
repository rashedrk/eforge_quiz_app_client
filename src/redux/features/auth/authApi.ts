import { baseApi } from "../../api/baseApi";
import { setCredentials, type AuthUser } from "@/redux/features/auth/authSlice";
import type { TResponse } from "@/types/common";
import { axiosInstance } from "@/helpers/axios/axiosInstance";

type LoginRequest = {
    email: string;
    password: string;
};

type LoginResponseData = {
    accessToken: string;
    user: AuthUser;
};

type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<TResponse<LoginResponseData>, LoginRequest>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const payload = (data as TResponse<LoginResponseData>)?.data;

                    if (!payload) return;

                    const { accessToken, user } = payload;
                    if (typeof accessToken === "string" && accessToken.length > 0) {
                        // Update Redux state
                        dispatch(setCredentials({ accessToken, user }));

                        // Eagerly set axios Authorization header to avoid races with persistence
                        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    }
                } catch (err) {
                    if (import.meta.env.DEV) {
                        // Let component handle via unwrap, but surface details in dev
                        console.debug("Login mutation failed:", err);
                    }
                }
            },
        }),
        register: builder.mutation<TResponse<unknown>, RegisterRequest>({
            query: (newUser) => ({
                url: "/user/create-user",
                method: "POST",
                data: newUser,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

