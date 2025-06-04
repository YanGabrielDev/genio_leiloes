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

interface SignFormProps {
  openSignUpForm: () => void
  isLoadingSubmit: boolean
}
export const SignForm = ({
  openSignUpForm,
  isLoadingSubmit,
}: SignFormProps) => {
  const form = useFormContext()
  // Estados para o perfil do usuário Google
  const [googleProfile, setGoogleProfile] = useState<{
    picture: string
    name: string
  } | null>(null)

  // Hook para login do Google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Login Success:', tokenResponse)

      try {
        // Requisição à API userinfo do Google
        const userInfoResponse = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        )
        console.log('Google User Info:', userInfoResponse.data)
        setGoogleProfile(userInfoResponse.data)
        // Aqui você pode enviar userInfoResponse.data ou tokenResponse.id_token para o seu backend
        // para criar/autenticar o usuário no seu sistema.
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
      {googleProfile ? (
        <div className="flex items-center gap-2 mt-4">
          <img
            src={googleProfile.picture}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">
            Olá, {googleProfile.name.split(' ')[0]}!
          </span>
          <Button variant="outline" onClick={googleLogout} className="ml-auto">
            Sair Google
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => googleLogin()}
          className="mt-4 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google icon"
            className="w-5 h-5"
          />
          <span className="font-normal">Entrar com Google</span>
        </Button>
      )}
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
