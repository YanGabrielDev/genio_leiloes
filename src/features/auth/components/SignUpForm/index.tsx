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
import { CreateUser } from '../../services/auth/auth.types'
import { useCreateUser } from '../../hooks/use-create-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '../../schemas/register-form.schema'
import { toast } from '@/hooks/use-toast'
import { useEffect } from 'react'

interface SignUpFormProps {
  closeSignUpForm: VoidFunction
  showVerification: VoidFunction
}

export const SignUpForm = ({
  closeSignUpForm,
  showVerification,
}: SignUpFormProps) => {
  const { mutateAsync: createUser, isPending: createUserIsPending } =
    useCreateUser()

  type RegisterFormFields = 'name' | 'email' | 'password' | 'confirm_password'

  const formFields: Array<RegisterFormFields> = [
    'name',
    'email',
    'password',
    'confirm_password',
  ]

  const placeholdersFields: Record<RegisterFormFields, string> = {
    name: 'Nome',
    email: 'E-mail',
    password: 'Senha',
    confirm_password: 'Confirmação de senha',
  }

  const form = useForm<CreateUser & { confirm_password: string }>({
    resolver: zodResolver(registerFormSchema),
  })

  const onSubmit: SubmitHandler<
    CreateUser & { confirm_password: string }
  > = async (formData) => {
    const { password, email, confirm_password, name } = formData

    if (password !== confirm_password) {
      toast({
        title: 'Erro de validação',
        description: 'As senhas precisam ser iguais para continuar!',
        variant: 'destructive',
      })
      return // Retorna para evitar a chamada da API se as senhas não coincidirem
    }
    try {
      await createUser({ email, password, name })
      showVerification()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    form.reset()
  }, [form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={`w-full flex gap-4 flex-col min-w-80`}>
          <h1 className="font-bold text-primary text-5xl">Registrar</h1>
          <h2 className="text-primary text-base opacity-70 font-medium">
            Registre sua conta
          </h2>

          {formFields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={placeholdersFields[fieldName]}
                      type={
                        fieldName.includes('password') ? 'password' : 'text'
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            disabled={createUserIsPending}
            type="submit"
            variant="primary"
          >
            {createUserIsPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="font-normal">Registrar</span>
          </Button>

          <div
            className={`flex w-full justify-between items-center absolute bottom-10 max-w-80`}
          >
            <span className="text-primary text-base opacity-70 font-normal">
              Já possui conta?
            </span>
            <Button
              variant="outline"
              onClick={() => {
                closeSignUpForm()
                form.reset()
              }}
            >
              <span className="font-normal">Faça login</span>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
