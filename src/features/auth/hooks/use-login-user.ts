import userService from '@/features/auth/services/auth/auth.services'
import { useMutation } from '@tanstack/react-query'
import { LoginUser } from '@/features/auth/services/auth/auth.types'
import { useToast } from '../../../hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useUserStore } from '@/store/user.store'

export const useLoginUser = () => {
  const { setUserProfile } = useUserStore()
  const { toast } = useToast()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: LoginUser) => userService.loginUser(data),
    onSuccess: async (data) => {
      Cookies.set('accessToken', data.data.jwt)
      const user = await userService.profileUser()
      setUserProfile(user)
      toast({
        title: 'Login realizado com sucesso!',
        variant: 'success',
      })
      navigate({ to: '/', search: { city: undefined } })
    },
    onError: (error) => {
      toast({
        title: 'Email ou senha incorretos!',

        variant: 'destructive',
      })
      console.error(error)
    },
  })
}
