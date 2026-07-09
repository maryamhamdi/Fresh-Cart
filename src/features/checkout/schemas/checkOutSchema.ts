import z from "zod";

export const checkOutSchema = z.object({
    details: z.string().nonempty("Details are required").max(200, "Details must be at most 200 characters").min(10, "Details must be at least 10 characters"),
    city: z.string().nonempty("City is required").max(50, "City must be at most 50 characters"),
    phone: z.string().nonempty("Phone number is required")
        .regex(/^01[0-2,5][0-9]{8}$/, "Invalid Egyptian phone number format"),
})

export type shipingAdressValues = z.infer<typeof checkOutSchema>