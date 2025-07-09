import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { auctionBaseUrl } from '@/constant/configs'
import {
  CurrentVehicleStatus,
  CurrentVehicleStatusValues,
} from '@/features/home/services/auction/action.types'

interface UseListCurrentVehicleStatus {
  vehicleId?: number
}

export const useFindVehicleCurrentStatusById = ({
  vehicleId,
}: UseListCurrentVehicleStatus) => {
  const url = new URL(auctionBaseUrl)

  if (vehicleId) {
    url.searchParams.append('data[]', vehicleId.toString())
  }

  return useQuery({
    queryKey: ['current-vehicle-status', url.toString()],
    queryFn: () => auctionService.listCurrentVehicleStatus(url.toString()),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!vehicleId,
    select: (data) => {
      const dataArray = Object.values(data) as CurrentVehicleStatus[]
      return dataArray?.[0] as unknown as CurrentVehicleStatusValues
    },
  })
}
