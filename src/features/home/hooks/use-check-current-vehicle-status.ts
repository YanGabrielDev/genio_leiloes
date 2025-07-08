import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { auctionBaseUrl } from '@/constant/configs'

interface UseListCurrentVehicleStatus {
  dataList: (string | null)[]
}

export const useListCurrentVehicleStatus = ({
  dataList,
}: UseListCurrentVehicleStatus) => {
  const url = new URL(auctionBaseUrl)

  if (dataList && dataList.length > 0) {
    dataList.forEach((value) => {
      if (value) url.searchParams.append('data[]', value.toString())
    })
  }

  return useQuery({
    queryKey: ['list-current-vehicle-status', url.toString()],
    queryFn: () => auctionService.listCurrentVehicleStatus(url.toString()),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!dataList && dataList.length > 0,
  })
}
