import type { ErrorDataShape, RTKQueryError } from "@/types/common";

// Normalizes RTK Query axiosBaseQuery error shapes to a message string
export function parseRtkQueryError(err: unknown, fallbackMessage: string): string {
    const rtkError = err as RTKQueryError | string;
    let message = fallbackMessage;
    const fieldMessages: string[] = [];

    if (typeof rtkError === "string") {
        message = rtkError;
    } else if (rtkError && typeof rtkError === "object") {
        const data = (rtkError as RTKQueryError).data;
        if (typeof data === "string") {
            message = data;
        } else if (data && typeof data === "object") {
            const maybe = data as ErrorDataShape;
            if (typeof maybe.message === "string" && maybe.message.trim().length > 0) {
                message = maybe.message;
            }
            if (Array.isArray(maybe.errorMessages)) {
                for (const field of maybe.errorMessages) {
                    if (typeof field?.message === "string" && field.message.length > 0) {
                        fieldMessages.push(field.message);
                    }
                }
            }
        }
    }

    return [message, ...fieldMessages].join("\n");
}


