import { useQuery } from '@tanstack/react-query'
import auctionService from '../services/auction/auction.service'
import Cookies from 'js-cookie'
export const useListFavorite = () => {
  const cookies = Cookies
  const token = cookies.get('accessToken')

  return useQuery({
    queryKey: ['list-favorite'],
    queryFn: () => auctionService.listFavorite(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  })
}
