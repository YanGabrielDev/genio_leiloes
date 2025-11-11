import { createFileRoute } from '@tanstack/react-router'
import { Template } from '@/components/Template'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { AuctionCard } from '@/features/home/components/AuctionCard'
import { PaginationSection } from '@/components/PaginationSection'
import { useListAuction } from '@/features/home/hooks/use-list-auction'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useMemo, useState } from 'react'
import { useListAuctionCities } from '@/features/home/hooks/use-list-auction-cities'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { useListCurrentVehicleStatus } from '@/features/home/hooks/use-check-current-vehicle-status'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'

export const Route = createFileRoute('/search')({
  component: SearchPage,
})

function SearchPage() {
  const { vehicleFiltersState } = useVehicleFilters()
  const {
    priceRange: [priceMin, priceMax],
    brandModelSearch,
    year,
    condition,
    city,
    auctionStatus,
  } = vehicleFiltersState
  const [page, setPage] = useState<number>(1)

  const listAuction = useListAuction({
    page,
    priceMax,
    priceMin,
    modelBrand: brandModelSearch,
    year,
    condition,
    city,
    auctionStatus,
  })
  const { data: listAuctionCities, isLoading: isLoadingListAuctionCities } =
    useListAuctionCities()
  const { mutate: toggleFavorite } = useFavoriteVehicle()
  const { userProfile } = useUserStore()
  const { data: favoriteItems } = useListFavorite()

  const favoriteItemids = favoriteItems?.map((item) => item.id)
  const handlePageChange = (newPage: number) => setPage(newPage)
  const cityFilterOptions = useMemo(
    () =>
      listAuctionCities?.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
        id: auction.id,
      })),
    [listAuctionCities, isLoadingListAuctionCities]
  )
  const vehicles = listAuction.data?.results
  const currentVehicleStatus = useListCurrentVehicleStatus({
    dataList: vehicles?.map((vehicle) => {
      if (!vehicle) return null
      const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
      return vehicleId
    }),
  })
  const vehicleList = vehicles?.map((vehicle) => {
    const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
    const currentVehicle = vehicleId
      ? currentVehicleStatus?.data?.[Number(vehicleId)]
      : null
    const currentValue = currentVehicle?.valor
    return {
      ...vehicle,
      avaliacao_atualizada: currentValue,
      encerrado: !!currentVehicle?.arrematante,
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

  return (
    <Template
      showFilters
      showActionFilters
      cityFilterOptions={cityFilterOptions}
    >
      <div className="text-center my-8">
        <h1 className="text-2xl font-bold">Explore Nossos Veículos</h1>
        <p className="text-lg text-gray-600">
          Encontre o carro dos seus sonhos
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold hidden md:block">
          Veículos Disponíveis:
        </h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {listAuction.isLoading ? (
          <SkeletonLoaderGrid count={12} />
        ) : (
          vehicleList?.map((item) => (
            <AuctionCard
              key={item.id}
              vehicle={item}
              onToggleFavorite={handleFavorite}
              isFavorite={favoriteItemids?.includes(item.id)}
              currentVehicleLoading={currentVehicleStatus.isLoading}
            />
          ))
        )}
      </div>
      <div className="w-full flex items-center justify-center mb-8 mt-8">
        <PaginationSection
          page={page}
          handleChangePage={handlePageChange}
          totalItems={listAuction.data?.count ?? 0}
        />
      </div>
    </Template>
  )
}
