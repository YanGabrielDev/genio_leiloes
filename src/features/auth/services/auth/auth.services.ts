import { api } from '@/lib/api'
import {
  CreateUser,
  GoogleProfile,
  LoginUser,
  ProfileData,
  ValidateUsers,
} from './auth.types'
import Cookies from 'js-cookie'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''
export const googleAuth = import.meta.env.VITE_GOOGLE_URL_API ?? ''

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

const deleteUser = async () => {
  const token = cookies.get('accessToken')
  const response = await api.delete(`${apiUrl}/users/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response
}

const validateToken = async (data: ValidateUsers) => {
  const response = await api.post(`${apiUrl}/users/validate-token/`, {
    token: data,
  })

  return response.data
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

const googleLogin = async (): Promise<GoogleProfile> => {
  const token = cookies.get('accessToken')
  const response = await api.get(googleAuth)
  return response.data
}

export default {
  createUser,
  verifyEmailUser,
  loginUser,
  profileUser,
  validateToken,
  googleLogin,
  deleteUser,
}
