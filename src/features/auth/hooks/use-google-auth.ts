import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'

import { useUserProfile } from '@/context/user-profile.context'
import { useToast } from '@/hooks/use-toast'
import { useValidateToken } from '@/features/auth/hooks/use-validate-token'
import usersServices from '@/features/auth/services/auth/auth.services'
import authServices from '@/features/auth/services/auth/auth.services'

interface GoogleProfile {
  picture: string
  name: string
  email: string
  sub: string
}

export const useGoogleAuth = () => {
  const [googleProfile, setGoogleProfile] = useState<GoogleProfile | null>(null)
  const { mutateAsync: validateToken } = useValidateToken()
  const { setUserProfile } = useUserProfile()
  const { toast } = useToast()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await authServices.googleLogin()

        const validateData = await validateToken({
          accessToken: tokenResponse.access_token,
          email: userInfoResponse.email,
          name: userInfoResponse.name,
          picture: userInfoResponse.picture,
          sub: userInfoResponse.sub,
        })

        setGoogleProfile(userInfoResponse)
        Cookies.set('accessToken', validateData.access_token)

        const user = await usersServices.profileUser()
        setUserProfile(user)
        localStorage.setItem('user', JSON.stringify(user))

        toast({
          title: 'Login realizado com sucesso!',
          variant: 'success',
        })
        navigate({ to: '/' })
      } catch (error) {
        console.error('Error fetching Google user info:', error)
        toast({
          title: 'Erro ao fazer login com o Google.',
          description: 'Por favor, tente novamente.',
          variant: 'destructive',
        })
      }
    },
    onError: (error) => {
      toast({
        title: 'Falha no login com o Google.',
        description: 'Verifique sua conexão ou tente novamente.',
        variant: 'destructive',
      })
    },
    scope: 'openid email profile',
  })

  const googleLogout = () => {
    setGoogleProfile(null)
    Cookies.remove('accessToken')
    localStorage.removeItem('user')
    setUserProfile(null)
  }

  return { googleLogin, googleProfile, googleLogout }
}
