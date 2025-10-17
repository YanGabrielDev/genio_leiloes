import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import auctionService from '../services/auction/auction.service'
const cookies = Cookies
export const useListAnalysis = () => {
  const token = cookies.get('accessToken')

  return useQuery({
    queryKey: ['list-analysis'],
    queryFn: () => auctionService.listAnalysis(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  })
}
