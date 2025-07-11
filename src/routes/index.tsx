import { AuctionCard } from '@/features/home/components/AuctionCard'
import { PaginationSection } from '@/components/PaginationSection'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { Template } from '@/components/Template'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useListAuction } from '@/features/home/hooks/useListAuction'
import { auctionMock } from '@/mock/auction.mock'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { useListSubscriptionsPlans } from '@/features/account/hooks/use-list-subscriptions-plans'
import { useUserStore } from '@/store/user.store'
import { useListCurrentVehicleStatus } from '@/features/home/hooks/use-check-current-vehicle-status'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'

export const Route = createFileRoute('/')({
  component: AppPage,
})

function AppPage() {
  const [page, setPage] = useState<number>(1)
  const { vehicleFiltersState } = useVehicleFilters()
  const { data: subscriptionPlans, isLoading: isLoadingSubscriptionPlans } =
    useListSubscriptionsPlans()
  const { setUserPlan } = useUserStore()

  const {
    priceRange: [priceMin, priceMax],
    brandModelSearch,
    year,
  } = vehicleFiltersState

  const listAuction = useListAuction({
    page,
    priceMax,
    priceMin,
    modelBrand: brandModelSearch,
    year,
  })
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
    }
  })
  const cityFilterOptions = useMemo(
    () =>
      auctionMock.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
      })),
    []
  )

  const handlePageChange = (newPage: number) => setPage(newPage)

  useEffect(() => {
    if (subscriptionPlans) setUserPlan(subscriptionPlans)
  }, [isLoadingSubscriptionPlans, subscriptionPlans])

  return (
    <Template showFilters cityFilterOptions={cityFilterOptions}>
      <div className="grid grid-cols-12 gap-4">
        {listAuction.isLoading || currentVehicleStatus.isLoading ? (
          <SkeletonLoaderGrid count={24} />
        ) : (
          vehicleList?.map((item) => (
            <AuctionCard
              key={item.id}
              year={item.ano}
              avaliacao={item.avaliacao_atualizada ?? item.avaliacao}
              name={item.marca_modelo}
              type={item.tipo}
              imagens={item.imagens}
              id={item.id}
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
