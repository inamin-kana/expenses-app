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
        z.enum(["comida", "productos básicos", "vivienda", "ocio", "transporte"]),
        z.enum(["sueldo", "ingresos extra", "paga"]),
        z.literal(""),
    ])
    .refine((val) => val !== "", {
        message: "Delect category"
    })
});

export type Schema = z.infer<typeof transactionSchema>
