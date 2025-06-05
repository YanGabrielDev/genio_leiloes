import { useMutation } from '@tanstack/react-query'
import type { ValidateUsers } from '@/services/users/users.types'
import { useNavigate } from '@tanstack/react-router'
import usersServices from '@/services/users/users.services'

export const usePostValidateToken = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: ValidateUsers) => usersServices.validateToken(data),
    onSuccess: async (data) => {
      console.log(data)

      navigate({ to: '/' })
    },
  })
}
