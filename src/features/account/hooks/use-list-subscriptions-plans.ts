import { useQuery } from '@tanstack/react-query'
import subscriptionsServices from '../services/subscriptions/subscriptions.services'
import type { ListSubscriptionsPlans } from '@/features/account/services/subscriptions/subscriptions.types'
import Cookies from 'js-cookie'

export const useListSubscriptionsPlans = () => {
  const accessToken = Cookies.get('accessToken')

  return useQuery<ListSubscriptionsPlans, Error>({
    queryKey: ['list-plans'],
    queryFn: () => subscriptionsServices.listSubscriptionsPlans(),
    enabled: !!accessToken,
  })
}
