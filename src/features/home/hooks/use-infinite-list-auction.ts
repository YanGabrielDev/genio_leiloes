import { VehicleFiltersState } from '@/context/vehicle-filter.context'
import auctionService from '@/features/home/services/auction/auction.service'
import { useInfiniteQuery } from '@tanstack/react-query'

export interface UseInfiniteListAuctionParams {
  priceMax?: number
  priceMin?: number
  modelBrand?: string
  year?: number
  city?: string
  condition?: 'conservado' | 'sucata' | undefined
  auctionStatus?: VehicleFiltersState['auctionStatus']
  items?: number
}

export const useInfiniteListAuction = ({
  priceMax,
  priceMin,
  modelBrand,
  year,
  condition,
  city,
  auctionStatus,
  items,
}: UseInfiniteListAuctionParams) => {
  return useInfiniteQuery({
    queryKey: [
      'auctionList',
      priceMax,
      priceMin,
      modelBrand,
      year,
      condition,
      city,
      auctionStatus,
      items,
    ],
    queryFn: ({ pageParam = 1 }: any) =>
      auctionService.listAuction({
        page: Number(pageParam),
        priceMax,
        priceMin,
        modelBrand,
        year,
        condition,
        city,
        auctionStatus,
        items,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next)
        return url.searchParams.get('page')
      }
      return undefined
    },
    initialPageParam: '1',
  })
}
