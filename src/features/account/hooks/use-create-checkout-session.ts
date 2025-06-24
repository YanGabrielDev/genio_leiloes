import { useMutation } from '@tanstack/react-query'
import { CreateCheckoutSession } from '../services/subscriptions/subscriptions.types'
import subscriptionsServices from '../services/subscriptions/subscriptions.services'

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: (data: CreateCheckoutSession) =>
      subscriptionsServices.subscriptionsCreateCheckoutSession(data),
    onSuccess: () => true,
  })
}
