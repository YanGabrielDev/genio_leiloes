import { Vehicles } from '@/interfaces/vehicle.interface'
import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import subscriptionsServices from '../services/subscriptions/subscriptions.services'
import type { ListSubscriptionsPlans } from '@/features/account/services/subscriptions/subscriptions.types'
export const useListSubscriptionsPlans = () => {
  return useQuery<ListSubscriptionsPlans, Error>({
    queryKey: ['list-plans'],
    queryFn: () => subscriptionsServices.listSubscriptionsPlans(),
  })
}
