import userService from "@/services/users/users.services"
import { useMutation } from "@tanstack/react-query"
import { LoginUser } from "@/services/users/users.types"
import { useToast } from "../use-toast"
import { useNavigate } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { useUserProfile } from "@/context/user-profile.context"

export const usePostLogin = () => {
    const { setUserProfile } = useUserProfile()
  const { toast } = useToast()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: LoginUser ) => userService.loginUser(data),
      onSuccess: async (data) => {
      Cookies.set("accessToken", data.data.jwt)
      const user = await userService.profileUser()
      setUserProfile(user)
      toast({
        title: "Login realizado com sucesso!",
        variant: "success",
    })
    navigate({to: "/"})
    }
  })
}
