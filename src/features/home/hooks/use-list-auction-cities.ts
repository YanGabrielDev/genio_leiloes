import { useQuery } from '@tanstack/react-query'
import auctionService from '../services/auction/auction.service'

export const useListAuctionCities = () => {
  return useQuery({
    queryKey: ['list-auction-cities'],
    queryFn: () => auctionService.listAuctionCities(),
    staleTime: 1000 * 60 * 5,
  })
}
