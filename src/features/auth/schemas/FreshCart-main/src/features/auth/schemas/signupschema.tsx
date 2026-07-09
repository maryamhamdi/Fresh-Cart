
import { z } from 'zod'

export const SignupSchema = z.object({
    name: z.string().nonempty('Name is required').min(3).max(24),
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    password: z.string().nonempty('Password is required')
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()\[\]{}\-_+=~`|:;"'<>,./?]/,
            "Password must contain at least one special character"
        ),
    rePassword: z.string().nonempty('Please confirm your password'),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
    // validate that phone mathches only egyptian phone numbers
    phone: z.string().nonempty('Phone number is required').regex(/^(?:\+20|0)?1[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"]
})


export type SignupSchemaType= z.infer<typeof SignupSchema>


