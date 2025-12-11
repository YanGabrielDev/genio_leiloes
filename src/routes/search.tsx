import { NoVehiclesFound } from '@/components/NoVehiclesFound'
import { createFileRoute } from '@tanstack/react-router'
import { Template } from '@/components/Template'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { AuctionCard } from '@/features/home/components/AuctionCard'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useMemo, useEffect } from 'react'
import { useListAuctionCities } from '@/features/home/hooks/use-list-auction-cities'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { useListCurrentVehicleStatus } from '@/features/home/hooks/use-check-current-vehicle-status'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { useInfiniteListAuction } from '@/features/home/hooks/use-infinite-list-auction'
import InfiniteScroll from 'react-infinite-scroll-component'
import { z } from 'zod'

const searchSchema = z.object({
  brandModelSearch: z.string().optional().catch(''),
})

export const Route = createFileRoute('/search')({
  validateSearch: (search) => searchSchema.parse(search),
  component: SearchPage,
})

function SearchPage() {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
  const { brandModelSearch: brandModelSearchFromUrl } = Route.useSearch()

  useEffect(() => {
    if (brandModelSearchFromUrl !== undefined) {
      setVehicleFiltersState((prevState) => ({
        ...prevState,
        brandModelSearch: brandModelSearchFromUrl,
      }))
    }
  }, [brandModelSearchFromUrl, setVehicleFiltersState])

  const {
    priceRange: [priceMin, priceMax],
    brandModelSearch,
    year,
    condition,
    city,
    auctionStatus,
  } = vehicleFiltersState

  const {
    data: listAuction,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteListAuction({
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
  const cityFilterOptions = useMemo(
    () =>
      listAuctionCities?.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
        id: auction.id,
      })),
    [listAuctionCities, isLoadingListAuctionCities]
  )
  const vehicles = listAuction?.pages.flatMap((page) => page.results)

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

  const hasVehicles = vehicleList && vehicleList.length > 0
  const isEmpty = !hasVehicles && !isLoading

  const renderSearchContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-12 gap-4">
          <SkeletonLoaderGrid count={12} />
        </div>
      )
    }

    if (isEmpty) {
      return <NoVehiclesFound />
    }

    return (
      <>
        <div className="text-center my-4">
          <h1 className="text-2xl font-bold">Explore Nossos Veículos</h1>
          <p className="text-lg text-gray-600">
            Explore todas as oportunidades de veículos disponíveis agoras
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold hidden md:block">
            Veículos Disponíveis:
          </h2>
        </div>
        <InfiniteScroll
          dataLength={vehicleList?.length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <div className="grid grid-cols-12 gap-4">
              <SkeletonLoaderGrid count={12} />
            </div>
          }
        >
          <div className="grid grid-cols-12 gap-4">
            {vehicleList?.map((item) => (
              <AuctionCard
                key={item.id}
                vehicle={item}
                onToggleFavorite={handleFavorite}
                isFavorite={favoriteItemids?.includes(item.id)}
                currentVehicleLoading={currentVehicleStatus.isLoading}
              />
            ))}
          </div>
        </InfiniteScroll>
      </>
    )
  }
  return (
    <Template
      showFilters
      showActionFilters
      cityFilterOptions={cityFilterOptions}
    >
      {renderSearchContent()}
    </Template>
  )
}
