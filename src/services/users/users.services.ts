import { api } from "@/lib/api"
import { CreateUser } from "./users.types"

export const apiUrl = import.meta.env.VITE_API_URL ?? ''

const createUser = async (data: CreateUser) => {
    const response = await api.post(apiUrl + "/users" + "/register/", data)
    return response
}

const verifyEmailUser = async (verifyCode: number) => {
    const response = await api.post(apiUrl + "/users" + "/verify-email/" + verifyCode + "/")
    return response
}

export default { createUser, verifyEmailUser }
