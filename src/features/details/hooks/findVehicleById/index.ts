import { Vehicles } from '@/interfaces/vehicle.interface'
import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'
import { UseGetVehicleById } from './types'

export const useFindVehicleById = ({ vehicleId }: UseGetVehicleById) => {
  return useQuery<Vehicles, Error>({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => auctionService.findVehicleById({ veiculo_id: vehicleId! }),

    enabled: !!vehicleId,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error.message.includes('404')) {
        return false
      }
      return failureCount < 3
    },
  })
}
