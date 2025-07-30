import auctionService from '@/features/home/services/auction/auction.service'
import { useQuery } from '@tanstack/react-query'

interface UseListCurrentVehicleStatus {
  vehicleId?: number
}

export const useListLastMoves = ({
  vehicleId,
}: UseListCurrentVehicleStatus) => {
  return useQuery({
    queryKey: ['list-moves', vehicleId],
    queryFn: () => {
      if (!vehicleId) return
      return auctionService.listLastMoves(vehicleId)
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!vehicleId,
  })
}
