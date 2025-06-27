import userService from '@/features/auth/services/auth/auth.services'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../../../hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useUserStore } from '@/store/user.store'

export const useDeleteUser = () => {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { setUserProfile } = useUserStore()
  return useMutation({
    mutationFn: () => userService.deleteUser(),
    onSuccess: async (data) => {
      Cookies.set('accessToken', data.data.jwt)
      localStorage.clear()
      toast({
        title: 'Usuário apagado com sucesso.',
        variant: 'success',
      })
      setUserProfile(null)
      navigate({ to: '/' })
    },
  })
}
