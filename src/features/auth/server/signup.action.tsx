'use server';

import { SignupSchema, SignupSchemaType } from "../schemas/signupschema";
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export async function SignupAction(values: SignupSchemaType) {

    const reValidationResult = SignupSchema.safeParse(values);
    if (!reValidationResult.success) {
        const errors: Record<string, string> = {};

        if (reValidationResult.error) {
            reValidationResult.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                const message = issue.message;

                if (!errors[field]) {
                    errors[field] = message;
                }
            })
        }

        return {
            success: false,
            message: "Validation Failed",
            errors: errors
        }
    }

    try {
        const { terms, ...requestBody } = values;

        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestBody,
            timeout: 15000, // يمنع تعليق الـ request للأبد لو الـ API متأخر أو مش راد
        }

        console.log('[SignupAction] Sending request with body:', requestBody);

        const { data } = await axios(options)

        console.log('[SignupAction] Response received:', data);

        if (data.message === "success") {
            return {
                success: true,
                message: "Account Created Successfully ",
                data
            }
        }
        return {
            success: false,
            message: data.message || "something went wrong"
        }
    } catch (error) {
        console.error('[SignupAction] Error occurred:', error);

        if (error instanceof AxiosError) {
            // Timeout أو مشكلة اتصال بالشبكة
            if (error.code === 'ECONNABORTED') {
                return {
                    success: false,
                    message: "Request timed out. Please check your connection and try again."
                }
            }

            if (!error.response) {
                return {
                    success: false,
                    message: "Network error. Please check your internet connection and try again."
                }
            }

            const errorMessage = error.response?.data?.message;
            const errorDetails = error.response?.data?.errors;

            // Handle specific validation errors from API
            if (errorMessage === "Account Already Exists" || errorDetails?.msg?.includes("already")) {
                return {
                    success: false,
                    message: 'Account exists already',
                    errors: {
                        email: "An account with this email already exists"
                    }
                }
            }

            // Return the actual API error message
            return {
                success: false,
                message: errorMessage || "An unknown error occurred",
                errors: errorDetails ? { general: JSON.stringify(errorDetails) } : undefined
            }
        }
        return {
            success: false,
            message: "An unexpected error occurred"
        }
    }
}