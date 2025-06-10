import userService from '@/features/auth/services/auth/auth.services'
import { useMutation } from '@tanstack/react-query'
import { CreateUser } from '@/features/auth/services/auth/auth.types'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUser) => userService.createUser(data),
    onSuccess: () => true,
  })
}
