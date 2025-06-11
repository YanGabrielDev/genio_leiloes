import { Analysis } from '@/features/home/services/auction/action.types'
import auctionService from '@/features/home/services/auction/auction.service'
import { useMutation } from '@tanstack/react-query'

export const useAnalysis = () => {
  return useMutation({
    mutationFn: (data: Analysis) => auctionService.analysis(data),
  })
}
