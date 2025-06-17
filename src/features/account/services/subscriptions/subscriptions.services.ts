import { api } from '@/lib/api'
import Cookies from 'js-cookie'

export const apiUrl = import.meta.env.VITE_API_URL ?? ''
export const googleAuth = import.meta.env.VITE_GOOGLE_URL_API ?? ''

const cookies = Cookies

const listSubscriptionsPlans = async () => {
  const response = await api.get(`${apiUrl}/subscriptions/plans/`)
  return response.data
}

export default {
  listSubscriptionsPlans,
}
