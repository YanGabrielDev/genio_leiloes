import { AuctionCard } from '@/features/home/components/AuctionCard'
import { PaginationSection } from '@/components/PaginationSection'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { Template } from '@/components/Template'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useListAuction } from '@/features/home/hooks/useListAuction'
import { auctionMock } from '@/mock/auction.mock'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useFilteredVehicles } from '@/features/home/hooks/useFilteredVehicles'

export const Route = createFileRoute('/')({
  component: AppPage,
})

function AppPage() {
  // const [searchVehicle, setSearchVehicle] = useState('')
  const [page, setPage] = useState<number>(1)
  const { vehicleFiltersState } = useVehicleFilters()
  const listAuction = useListAuction({
    page,
    priceMax: vehicleFiltersState.priceRange[1],
    priceMin: vehicleFiltersState.priceRange[0],
    modelBrand: vehicleFiltersState.brandModelSearch,
    year: vehicleFiltersState.year,
  })

  const vehicles = listAuction.data?.results
  const cityFilterOptions = useMemo(
    () =>
      auctionMock.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
      })),
    []
  )

  // const handleSearchChange = (newSearchValue: string) => {
  //   setSearchVehicle(newSearchValue)
  //   filterBySearch(newSearchValue)
  // }

  const handlePageChange = (newPage: number) => setPage(newPage)

  return (
    <Template showFilters cityFilterOptions={cityFilterOptions}>
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {listAuction.isLoading ? (
          <SkeletonLoaderGrid count={24} />
        ) : (
          vehicles?.map((item) => (
            <AuctionCard
              year={item.ano}
              avaliacao={item.avaliacao}
              name={item.marca_modelo}
              type={item.tipo}
              imagens={item.imagens}
              id={item.id}
            />
          ))
        )}
      </div>
      <div className="w-full flex items-center justify-center mb-8">
        <PaginationSection
          page={page}
          handleChangePage={handlePageChange}
          totalItems={listAuction.data?.count ?? 0}
        />
      </div>
    </Template>
  )
}
