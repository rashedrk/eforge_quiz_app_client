import { baseApi } from "@/redux/api/baseApi";
import type { Question } from "@/types/assessment";
import type { TResponse } from "@/types/common";


export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuestionsByStep: builder.query<TResponse<Question[]>, number>({
            query: (step) => ({
                url: `/question/step/${step}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetQuestionsByStepQuery } = questionApi;

