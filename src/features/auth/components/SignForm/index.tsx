import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginUser } from '../../services/auth/auth.types'
import { useLoginUser } from '../../hooks/use-login-user'
import { loginFormSchema } from '../../schemas/login-form.schema'
import { useGoogleAuth } from '../../hooks/use-google-auth'
import { useEffect } from 'react'
import { LegalModal } from '@/components/LegalModal'
import { privacy, terms } from '@/lib/legal'

interface SignFormProps {
  openSignUpForm: () => void
}

export const SignForm = ({ openSignUpForm }: SignFormProps) => {
  const { mutateAsync: loginUser, isPending: loginUserIsPending } =
    useLoginUser()
  const { googleLogin } = useGoogleAuth()

  const form = useForm<LoginUser>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit: SubmitHandler<LoginUser> = async (formData) => {
    await loginUser(formData)
  }

  useEffect(() => {
    form.reset()
  }, [form])

  return (
    <Form {...form}>
      {' '}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
      >
        <div className="w-full flex gap-4 flex-col min-w-80">
          <h1 className="font-bold text-primary text-5xl">Login</h1>
          <h2 className="text-primary text-base opacity-70 font-medium">
            Acesse sua conta para ter mais funcionalidades.
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Senha" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <h2 className="text-primary text-base opacity-70 font-normal">
            Esqueceu sua senha?
          </h2>
          <Button
            disabled={loginUserIsPending}
            variant={'primary'}
            type="submit"
          >
            {loginUserIsPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="font-normal ">Acessar Conta</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => googleLogin()}
            className="mt-4 flex items-center justify-center gap-2"
            type="button"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google icon"
              className="w-5 h-5"
            />
            <span className="font-normal">Entrar com Google</span>
          </Button>
          <p className="text-xs text-center text-gray-500 mt-4">
            Ao fazer login, você concorda com nossos{' '}
            <LegalModal title="Termos de Serviço" content={terms}>
              <span className="text-blue-600 cursor-pointer">
                Termos de Serviço
              </span>
            </LegalModal>{' '}
            e{' '}
            <LegalModal title="Política de Privacidade" content={privacy}>
              <span className="text-blue-600 cursor-pointer">
                Política de Privacidade
              </span>
            </LegalModal>
            .
          </p>
          {/* <div className="flex w-full justify-between items-center absolute bottom-10 max-w-80">
            <span className="text-primary text-base opacity-70 font-normal">
              Não possui conta?
            </span>
            <Button
              variant="outline"
              onClick={() => {
                openSignUpForm()
                form.reset()
              }}
            >
              <span className="font-normal">Criar conta</span>
            </Button>
          </div> */}
        </div>
      </form>
    </Form>
  )
}
