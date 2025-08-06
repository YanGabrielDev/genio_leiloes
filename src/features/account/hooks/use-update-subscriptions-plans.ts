import { useMutation } from '@tanstack/react-query'
import subscriptionsServices from '../services/subscriptions/subscriptions.services'
import Cookies from 'js-cookie'
import { useUserStore } from '@/store/user.store'

export const useUpdateSubscriptionsPlans = () => {
  const { setUserPlan } = useUserStore()
  return useMutation({
    mutationFn: () => subscriptionsServices.listSubscriptionsPlans(),
    onSuccess: (newPlan) => {
      setUserPlan(newPlan)
    },
  })
}
