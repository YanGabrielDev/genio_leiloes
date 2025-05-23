import { AuctionCard } from "@/components/AuctionCard"
import { PaginationSection } from "@/components/PaginationSection"
import { SkeletonLoaderGrid } from "@/components/SkeletonLoaderGrid"
import { Template } from "@/components/Template"
import { useFilteredVehicles } from "@/hooks/useFilteredVehicles"
import { useListAuction } from "@/hooks/useGetAuction"
import { auctionMock } from "@/mock/auction.mock"
import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"

export const Route = createFileRoute("/")({
  component: AppPage,
})

function AppPage() {
  const [searchVehicle, setSearchVehicle] = useState("")
  const [page, setPage] = useState<number>(1)

  const listAuction = useListAuction({ page })
  const { filteredVehicles, filterBySearch } = useFilteredVehicles(
    listAuction.data?.results || []
  )

  const cityFilterOptions = useMemo(
    () =>
      auctionMock.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
      })),
    []
  )

  const handleSearchChange = (newSearchValue: string) => {
    setSearchVehicle(newSearchValue)
    filterBySearch(newSearchValue)
  }

  const handlePageChange = (newPage: number) => setPage(newPage)

  return (
    <Template
      cityFilterOptions={cityFilterOptions}
      handleChangeSearch={handleSearchChange}
      search={searchVehicle}
    >
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {listAuction.isLoading
          ? (
            <SkeletonLoaderGrid count={24} />
            )
          : (
              filteredVehicles.map((item) => (
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
