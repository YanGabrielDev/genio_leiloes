import { z } from "zod";

export const registerFormSchema = z.object({
    name: z.string({ required_error: "Campo obrigatório!" }),
    email: z.string({ required_error: "Campo obrigatório!" }).email({ message: 'Email inválido' }),
    password: z.string({ required_error: "Campo obrigatório!" })
        .min(8, { message: "A senha precisa ter pelo menos 8 digitos." })
        .max(25, { message: "A senha ultrapassou o limite de caracteres" }),
    confirm_password: z.string({ required_error: "Campo obrigatório!" })
        .min(8, { message: "A senha precisa ter pelo menos 8 digitos." })
        .max(25, { message: "A senha ultrapassou o limite de caracteres" })
}).refine((value) => value.password === value.confirm_password, {
    message: "As senhas precisam ser iguais",
    path: ['user_confirm_password']
})