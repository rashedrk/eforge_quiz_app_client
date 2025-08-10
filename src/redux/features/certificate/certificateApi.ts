import { baseApi } from "@/redux/api/baseApi";
import type { TResponse } from "@/types/common";

export type CreateCertificateRequest = {
    userId: string;
    levelAchieved: string;
    score: number; // percentage 0-100
};

export const certificateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCertificate: builder.mutation<TResponse<unknown>, CreateCertificateRequest>({
            query: (body) => ({
                url: "/certificate",
                method: "POST",
                data: body,
            }),
        }),
    }),
});

export const { useCreateCertificateMutation } = certificateApi;


