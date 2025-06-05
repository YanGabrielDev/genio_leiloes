import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import usersServices from '@/services/users/users.services'
import { useUserProfile } from '@/context/user-profile.context'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { usePostValidateToken } from '@/hooks/usePostValidateToken'

interface SignFormProps {
  openSignUpForm: () => void
  isLoadingSubmit: boolean
}
export const SignForm = ({
  openSignUpForm,
  isLoadingSubmit,
}: SignFormProps) => {
  const form = useFormContext()
  const { mutateAsync: validateToken } = usePostValidateToken()
  // Estados para o perfil do usuário Google
  const [googleProfile, setGoogleProfile] = useState<{
    picture: string
    name: string
  } | null>(null)
  const { setUserProfile } = useUserProfile()
  const { toast } = useToast()
  const navigate = useNavigate()

  // Hook para login do Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Login Success:', tokenResponse)

      try {
        // Requisição à API userinfo do Google
        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        )

        const data = await validateToken({
          accessToken: tokenResponse.access_token,
          email: userInfoResponse?.data?.email,
          name: userInfoResponse?.data?.name,
          picture: userInfoResponse?.data?.picture,
          sub: userInfoResponse?.data?.sub,
        })
        console.log('Google User Info:', userInfoResponse.data, data)
        setGoogleProfile(userInfoResponse.data)
        const user = await usersServices.profileUser()
        setUserProfile(user)
        toast({
          title: 'Login realizado com sucesso!',
          variant: 'success',
        })
        navigate({ to: '/' })
      } catch (error) {
        console.error('Error fetching Google user info:', error)
      }
    },
    onError: (error) => console.log('Google Login Failed:', error),
    scope: 'openid email profile', // Escopos necessários
  })

  // Função para logout do Google (simplesmente limpa os estados)
  const googleLogout = () => {
    setGoogleProfile(null)
    console.log('Google Logged out')
  }

  useEffect(() => {
    if (googleProfile) {
      console.log('Google Profile ready:', googleProfile)
      // Aqui você pode redirecionar o usuário ou atualizar a UI com as informações do perfil
    }
  }, [googleProfile])
  return (
    <div className="w-full flex gap-4 flex-col min-w-80">
      <h1 className="font-bold text-primary text-5xl">Login</h1>
      <h2 className="text-primary text-base opacity-70 font-medium">
        Acesse sua conta para ter mais funcionalidades.
      </h2>
      <FormField
        control={form.control}
        name="email"
        rules={{ required: 'Campo obrigatório!' }}
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
        rules={{ required: 'Campo obrigatório!' }}
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
      <Button disabled={isLoadingSubmit} variant={'primary'} type="submit">
        {isLoadingSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
      <div className="flex w-full justify-between items-center absolute bottom-10 max-w-80">
        <span className="text-primary text-base opacity-70 font-normal">
          Não possui conta?
        </span>
        <Button variant="outline" onClick={openSignUpForm}>
          <span className="font-normal">Criar conta</span>
        </Button>
      </div>
    </div>
  )
}
