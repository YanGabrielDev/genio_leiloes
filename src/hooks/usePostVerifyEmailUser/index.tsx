import userService from "@/services/users/users.services"
import { useMutation } from "@tanstack/react-query"

export const usePostVerifyEmailUser = () => {
  return useMutation({
    mutationFn: (data: number ) => userService.verifyEmailUser(data),
    onSuccess: () => true
  })
}
