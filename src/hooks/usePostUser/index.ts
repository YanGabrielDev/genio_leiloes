import userService from "@/services/users/users.services"
import { useMutation } from "@tanstack/react-query"
import { CreateUser } from "@/services/users/users.types"

export const usePostUser = () => {
  return useMutation({
    mutationFn: (data: CreateUser ) => userService.createUser(data),
    onSuccess: () => true
  })
}
