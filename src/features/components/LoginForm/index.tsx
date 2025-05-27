'use client'
import { useState } from "react"
import { SignForm } from "../SignForm"
import { SignUpForm } from "../SignUpForm"
import { SubmitHandler, useForm } from "react-hook-form"
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from "@/schemas/register-form.schema"
import { loginFormSchema } from "@/schemas/login-form.schema"
import { CreateUser, LoginUser } from "@/services/users/users.types"
import { usePostUser } from "@/hooks/usePostUser"
import { useToast } from "@/hooks/use-toast"
import { VerificationCodeForm } from "../VerificationCodeForm"
import { usePostLogin } from "@/hooks/usePostLogin"

interface LoginForm {
}

export const LoginForm = ({ }: LoginForm) => {
    const [showSignUpForm, setShowSignUpform] = useState(false)
    const [showVerificationForm, setShowVerificationForm] = useState(false)
    const [registeredEmail, setRegisteredEmail] = useState('')
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

    const { mutateAsync: createUser } = usePostUser()
    const { mutateAsync: loginUser, isPending: loginUserIsPending } = usePostLogin()
    
    const { toast } = useToast()
    
    const schema = showSignUpForm ? registerFormSchema : loginFormSchema
    
    const form = useForm({
        resolver: zodResolver(schema),
    })

    const openSignUpForm = () => { setShowSignUpform(true), form.reset() }
    const closeSignUpForm = () => { setShowSignUpform(false), form.reset() }

    const handleVerificationSuccess = () => {
        toast({
            title: "Conta verificada com sucesso!",
            description: "Agora você pode fazer login com suas credenciais.",
            variant: "default",
        })
        setShowVerificationForm(false)
        closeSignUpForm()
    }

    const onSubmit: SubmitHandler<CreateUser | LoginUser> = async (formData) => {
        try {
            setIsLoadingSubmit(true)
            
            if (showSignUpForm) {
                const { name, password, email, confirm_password } = formData as CreateUser
                
                if (password !== confirm_password) {
                    toast({
                        title: "Erro de validação",
                        description: "As senhas precisam ser iguais para continuar!",
                        variant: "destructive",
                    })
                    return
                }
                
                const data = await createUser({
                    email,
                    name,
                    password
                })
                
                if (data) {
                    setRegisteredEmail(email)
                    setShowVerificationForm(true)
                    toast({
                        title: "Registro concluído!",
                        description: "Verifique seu e-mail para o código de confirmação.",
                        variant: "default",
                    })
                }
            } else {
                console.log("opa")
                const { email, password } = formData as LoginUser
                await loginUser({email, password})

            }
        } catch (error) {
            console.error(error)
            if (showSignUpForm) {
                toast({
                    title: "Erro no cadastro",
                    description: "Ocorreu um erro ao cadastrar o usuário.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Erro no login",
                    description: "Ocorreu um erro ao tentar fazer login.",
                    variant: "destructive",
                })
            }
        } finally {
            setIsLoadingSubmit(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {showVerificationForm ? (
                    <VerificationCodeForm 
                        email={registeredEmail}
                        onSuccess={handleVerificationSuccess}
                        onResendCode={() => toast({
                            title: "Código reenviado",
                            description: "Verifique seu e-mail novamente.",
                            variant: "default",
                        })}
                    />
                ) : showSignUpForm ? (
                    <SignUpForm closeSignUpForm={closeSignUpForm} isLoadingSubmit={isLoadingSubmit} />
                ) : (
                    <SignForm openSignUpForm={openSignUpForm} isLoadingSubmit={loginUserIsPending} />
                )}
            </form>
        </Form>
    )
}