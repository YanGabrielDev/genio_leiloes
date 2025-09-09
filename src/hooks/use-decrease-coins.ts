import { Analysis } from '@/features/home/services/auction/action.types'
import auctionService from '@/features/home/services/auction/auction.service'
import { DecreaseCoinsBody } from '@/services/coins'
import coinsService from '@/services/coins/coins.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDecreaseCoins = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: DecreaseCoinsBody) => coinsService.decreaseCoins(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-plans'] })
    },
  })
}
