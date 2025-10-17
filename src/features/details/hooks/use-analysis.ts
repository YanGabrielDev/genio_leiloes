import { Analysis } from '@/features/home/services/auction/action.types'
import auctionService from '@/features/home/services/auction/auction.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAnalysis = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Analysis) => auctionService.analysis(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-analysis'] })

      queryClient.invalidateQueries({ queryKey: ['list-plans'] })
    },
  })
}
