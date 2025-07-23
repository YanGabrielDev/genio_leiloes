import { useQuery } from '@tanstack/react-query'
import auctionService from '../services/auction/auction.service'

export const useListFavorite = () => {
  return useQuery({
    queryKey: ['list-favorite'],
    queryFn: () => auctionService.listFavorite(),
    staleTime: 1000 * 60 * 5,
  })
}
