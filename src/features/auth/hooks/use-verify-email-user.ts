import userService from '@/features/auth/services/auth/auth.services'
import { useMutation } from '@tanstack/react-query'

export const useVerifyEmailUser = () => {
  return useMutation({
    mutationFn: (data: number) => userService.verifyEmailUser(data),
    onSuccess: () => true,
  })
}
