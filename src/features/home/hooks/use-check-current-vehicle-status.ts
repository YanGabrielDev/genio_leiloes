import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { auctionBaseUrl } from '@/constant/configs'

interface UseListCurrentVehicleStatus {
  dataList?: (string | null)[]
}

export const useListCurrentVehicleStatus = ({
  dataList,
}: UseListCurrentVehicleStatus) => {
  const url = new URL(auctionBaseUrl)

  // if (dataList && dataList.length > 0) {
  const opa = 236503

  // dataList.forEach((value) => {
  //   const opa = 236503
  //   if (value) url.searchParams.append('data[]', opa.toString())
  // })
  url.searchParams.append('data[]', opa.toString())
  // }

  return useQuery({
    queryKey: ['list-current-vehicle-status', url.toString()],
    queryFn: () => auctionService.listCurrentVehicleStatus(url.toString()),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!dataList && dataList.length > 0,
  })
}
