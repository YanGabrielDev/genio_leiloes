import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import {
  CreateCheckoutSession,
  ListSubscriptionsPlans,
} from './subscriptions.types'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''
export const googleAuth = import.meta.env.VITE_GOOGLE_URL_API ?? ''

const cookies = Cookies

const listSubscriptionsPlans = async (): Promise<ListSubscriptionsPlans> => {
  const token = cookies.get('accessToken')

  const response = await api.get(`${apiUrl}/subscriptions/moedas/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

const subscriptionsCreateCheckoutSession = async (
  data: CreateCheckoutSession
) => {
  const token = cookies.get('accessToken')

  const response = await api.post(
    `${apiUrl}/subscriptions/create-checkout-session/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

export default {
  listSubscriptionsPlans,
  subscriptionsCreateCheckoutSession,
}
