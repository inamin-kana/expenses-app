import { z } from 'zod';

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"]),
    date: z.string().min(1, {message: "Seleccione una fecha"}),
    amount: z.number().min(1, {message: "Introduzca el importe."}),
    content: z
        .string()
        .min(1, {message: "Introduzca el detalles."})
        .max(50, {message: "Máximo 50 letras."}),
    category: 
    z.union([
        z.enum(["groceries", "daily necessities", "housing expense", "entertainment", "transportation expenses"]),
        z.enum(["salary", "extra income", "pocket money"]),
        z.literal(""),
    ])
    .refine((val) => val !== "", {
        message: "Delect category"
    })
});

export type Schema = z.infer<typeof transactionSchema>
