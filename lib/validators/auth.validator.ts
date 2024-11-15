import {z}  from 'zod';

export const SignInSchema = z.object({
    email:z.string().email().min(1,"Email is Required"),
    password:z.string().min(1,"Password is Required")
}
)

export type SignInSchemaType = z.infer<typeof SignInSchema>