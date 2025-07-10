import { useMutation } from '@tanstack/react-query'
import type { ValidateUsers } from '@/features/auth/services/auth/auth.types'
import { useNavigate } from '@tanstack/react-router'
import usersServices from '@/features/auth/services/auth/auth.services'

export const useValidateToken = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: ValidateUsers) => usersServices.validateToken(data),
    onSuccess: async (data) => {
      navigate({ to: '/' })
    },
  })
}
