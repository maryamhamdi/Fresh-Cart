import { z } from "zod"

export const subjectOptions = [
    { value: "order", label: "Order Inquiry", icon: "📦" },
    { value: "shipping", label: "Shipping Question", icon: "🚚" },
    { value: "return", label: "Returns & Refunds", icon: "↩️" },
    { value: "product", label: "Product Information", icon: "🏷️" },
    { value: "feedback", label: "Feedback", icon: "💬" },
    { value: "other", label: "Other", icon: "❓" },
] as const

export const contactSchema = z.object({
    name: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(val),
            "Please enter a valid phone number"
        ),
    subject: z
        .string()
        .min(1, "Please select a subject"),
    message: z
        .string()
        .min(1, "Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message must be less than 1000 characters"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
