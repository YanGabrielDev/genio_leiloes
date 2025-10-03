import { AuctionCard } from '@/features/home/components/AuctionCard'
import { useListAuction } from '@/features/home/hooks/use-list-auction'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useListCurrentVehicleStatus } from '@/features/home/hooks/use-check-current-vehicle-status'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

interface RelatedVehiclesProps {
  brand: string
  currentVehicleId: number
}

export function RelatedVehicles({
  brand,
  currentVehicleId,
}: RelatedVehiclesProps) {
  const { data: listAuction, isLoading } = useListAuction({
    modelBrand: brand,
  })

  const { data: favoriteItems } = useListFavorite()
  const { mutate: toggleFavorite } = useFavoriteVehicle()
  const { userProfile } = useUserStore()

  const favoriteItemids = favoriteItems?.map((item) => item.id)

  // Filtra o veículo atual e limita a 4 resultados
  const relatedVehicles = listAuction?.results
    .filter((vehicle) => vehicle.id !== currentVehicleId)
    .slice(0, 4)

  const currentVehicleStatus = useListCurrentVehicleStatus({
    dataList: relatedVehicles?.map((vehicle) => {
      if (!vehicle) return null
      const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
      return vehicleId
    }),
  })

  const vehicleList = relatedVehicles?.map((vehicle) => {
    const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
    const currentVehicle = vehicleId
      ? currentVehicleStatus?.data?.[Number(vehicleId)]
      : null
    const currentValue = currentVehicle?.valor

    return {
      ...vehicle,
      avaliacao_atualizada: currentValue,
    }
  })

  const handleFavorite = (vehicleId: number) => {
    if (!userProfile) {
      toast({
        description: 'Faça login para favoritar veículos',
        variant: 'info',
      })
      return
    }
    toggleFavorite(vehicleId)
  }

  if (isLoading || (vehicleList && vehicleList.length === 0)) {
    return null // Não renderiza nada se estiver carregando ou se não houver veículos relacionados
  }

  return (
    <div className="mt-12 py-8 border-t">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        Veículos Relacionados
      </h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full max-w-full"
      >
        <CarouselContent>
          {vehicleList?.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-11/12 md:basis-1/2 lg:basis-1/3"
            >
              <AuctionCard
                vehicle={item as Vehicles}
                onToggleFavorite={handleFavorite}
                isFavorite={favoriteItemids?.includes(item.id)}
                currentVehicleLoading={currentVehicleStatus.isLoading}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
