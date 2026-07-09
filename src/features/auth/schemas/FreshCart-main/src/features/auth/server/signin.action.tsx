'use server'
import { url } from "inspector";
import { SigninSchema, SigninValuesTypes } from "../schemas/signin.schema";
import z from "zod";
import axios, { AxiosError } from "axios";



export async function SigninAction(values: SigninValuesTypes) {
    const reValidationResylt = SigninSchema.safeParse(values);
    if (!reValidationResylt.success) {
        const errors: Record<string, string> = {};

        if (reValidationResylt.error) {
            reValidationResylt.error.issues.forEach((issue) => {
                const field = issue.path[0] as string
                const message = issue.message
                if (!errors[field]) {
                    errors.field = message
                }
            })

            return {
                success: false,
                message: 'Validation Failed',
                errors: errors
            }
        }

    }

    try {
        const { keepme, ...requestBody } = values
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            method: 'POST',
            data: requestBody
        }
        const { data } = await axios.request(options)
        if (data.message === "success") {
            return {
                success: true,
                message: "Signed in Successfully ",
                data
            }
        }
        return {
            success: false,
            message: data.message || "something went wrong"
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const erroeMessage = error.response?.data.message;
            if (erroeMessage === "Incorrect email or password") {
                return {
                    success: false,
                    message: 'Incorrect email or password',
                    errors: {
                        password: "Incorrect email or password"
                    }
                }
            }

            return {
                success: false,
                message: "an unknown error occurred"
            }
        }
    }
}
