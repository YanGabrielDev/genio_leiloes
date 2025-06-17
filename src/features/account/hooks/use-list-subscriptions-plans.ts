import { Vehicles } from '@/interfaces/vehicle.interface'
import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import subscriptionsServices from '../services/subscriptions/subscriptions.services'

export const useListSubscriptionsPlans = () => {
  return useQuery<any, Error>({
    queryKey: ['list-plans'],
    queryFn: () => subscriptionsServices.listSubscriptionsPlans(),
  })
}
