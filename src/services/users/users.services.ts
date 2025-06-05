import { api } from '@/lib/api'
import {
  CreateUser,
  LoginUser,
  ProfileData,
  ValidateUsers,
} from './users.types'
import Cookies from 'js-cookie'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''
const cookies = Cookies

const createUser = async (data: CreateUser) => {
  const response = await api.post(`${apiUrl}/users/register/`, data)
  return response
}

const verifyEmailUser = async (verifyCode: number) => {
  const response = await api.post(`${apiUrl}/users/verify-email/${verifyCode}/`)
  return response
}

const loginUser = async (data: LoginUser) => {
  const response = await api.post(`${apiUrl}/users/login/`, data)
  return response
}

const validateToken = async (data: ValidateUsers) => {
  const response = await api.post(`${apiUrl}/users/validate-token/`, {
    token: data,
  })

  return response
}

const profileUser = async (): Promise<ProfileData> => {
  const token = cookies.get('accessToken')
  const response = await api.get(`${apiUrl}/users/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export default {
  createUser,
  verifyEmailUser,
  loginUser,
  profileUser,
  validateToken,
}
