import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'

export interface UseListAuctionParams {
  page: number
  priceMax: number
  priceMin: number
  modelBrand: string
  year?: number
  city?: string
  condition?: 'conservado' | 'sucata' | undefined
}

export const useListAuction = ({
  page,
  priceMax,
  priceMin,
  modelBrand,
  year,
  condition,
  city,
}: UseListAuctionParams) => {
  return useQuery({
    queryKey: [
      'auctionList',
      page,
      priceMax,
      priceMin,
      modelBrand,
      year,
      condition,
      city,
    ],
    queryFn: () =>
      auctionService.listAuction({
        page,
        priceMax,
        priceMin,
        modelBrand,
        year,
        condition,
        city,
      }),
    staleTime: 1000 * 60 * 5, // Dados serão considerados 'stale' após 5 minutos
    // cacheTime: 1000 * 60 * 10,
  })
}
