import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'

export interface UseListAuctionParams {
  page: number
  priceMax: number
  priceMin: number
  modelBrand: string
  year?: number
}

export const useListAuction = ({
  page,
  priceMax,
  priceMin,
  modelBrand,
  year,
}: UseListAuctionParams) => {
  return useQuery({
    queryKey: ['auctionList', page, priceMax, priceMin, modelBrand, year],
    queryFn: () =>
      auctionService.listAuction({
        page,
        priceMax,
        priceMin,
        modelBrand,
        year,
      }),
    staleTime: 1000 * 60 * 5, // Dados serão considerados 'stale' após 5 minutos
    // cacheTime: 1000 * 60 * 10,
  })
}
