
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "./axiosInstance";
import type { TMeta } from "@/types/common";

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: "" }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
            meta?: TMeta;
            contentType?: string;
        },
        unknown,
        unknown
    > =>
        async ({ url, method = "GET", data, params, headers, contentType }) => {
            try {
                const result: AxiosResponse = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        "Content-Type": contentType || "application/json",
                        ...headers,
                    },
                });
                return { data: result.data } as unknown as { data: unknown };
            } catch (axiosError) {
                const err = axiosError as AxiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data ?? err.message,
                    },
                };
            }
        };