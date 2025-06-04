import auctionService from '@/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { UseListAuctionParams } from './types'

export const useListAuction = ({
  page,
  priceMax,
  priceMin,
  modelBrand,
}: UseListAuctionParams) => {
  return useQuery({
    queryKey: ['auctionList', page, priceMax, priceMin, modelBrand],
    queryFn: () =>
      auctionService.getAuction({ page, priceMax, priceMin, modelBrand }),
  })
}
