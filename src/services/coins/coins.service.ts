import { api } from '@/lib/api'
import {
  Alert,
  CreateAlertPayload,
  DeleteAlertParams,
  GetAlertDetailsParams,
  UpdateAlertParams,
} from '@/features/auction-alert/services/alert/alert.types'
import Cookies from 'js-cookie'
import { DecreaseCoinsBody } from './coins.types'
export const apiUrl = import.meta.env.VITE_API_URL ?? ''
const cookies = Cookies

const decreaseCoins = async (data: DecreaseCoinsBody) => {
  const token = cookies.get('accessToken')

  const response = await api.post(`${apiUrl}/users/descontar-moedas/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export default {
  decreaseCoins,
}
