import {z} from 'zod';

export const validationSchema = z.object({
    name: z.string().min(1,{
        message: "Enter A valid name"
    }),
    email: z.string().email({
        message: "Enter a valid mail id"
    }),
    contact: z.string().length(10, {
        message: "Enter a valid 10-digit Number"
    }),
    age: z.number().min(18,{
        message: "Invalid values"
    }),
    password: z.string().min(8,{
        message: "Enter a valid password"
    })
})