import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { UseListAuctionParams } from './types'

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
    // Adicionar staleTime e cacheTime se necessário para otimizar o cache
    // staleTime: 1000 * 60 * 5, // Dados serão considerados 'stale' após 5 minutos
    // cacheTime: 1000 * 60 * 10, // Dados permanecerão no cache por 10 minutos
  })
}
