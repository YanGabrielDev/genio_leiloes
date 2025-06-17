import { api } from '@/lib/api'
import Cookies from 'js-cookie'
import { ListSubscriptionsPlans } from './subscriptions.types'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''
export const googleAuth = import.meta.env.VITE_GOOGLE_URL_API ?? ''

const cookies = Cookies

const listSubscriptionsPlans = async (): Promise<ListSubscriptionsPlans> => {
  const token = cookies.get('accessToken')

  const response = await api.get(`${apiUrl}/subscriptions/plans/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export default {
  listSubscriptionsPlans,
}
