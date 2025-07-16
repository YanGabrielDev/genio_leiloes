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
import { Helmet } from 'react-helmet-async'

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
    <>
      <Helmet>
        <title>
          Leilões Detran com Análise por IA | Avaliação Inteligente de Veículos
        </title>

        <meta
          name="description"
          content="Veja leilões oficiais do Detran com tecnologia de inteligência artificial para avaliação precisa de veículos. Encontre carros e motos com transparência e segurança."
        />
        <meta
          name="keywords"
          content="leilão Detran, leilões de veículos, avaliação por IA, inteligência artificial, carros usados, motos em leilão, caminhões Detran, análise inteligente de veículos"
        />

        <meta property="og:title" content="Leilões Detran com Análise por IA" />
        <meta
          property="og:description"
          content="Acesse os leilões de veículos do Detran com avaliação feita por inteligência artificial. Segurança, precisão e ótimos preços em veículos usados."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://genio-leiloes.vercel.app" />
        <meta
          name="google-site-verification"
          content="WFx8v4XixaF4MN5UbfYXw0Y_smLNfhITzP5BmE7wUyk"
        />
        <meta
          property="og:image"
          content="https://genio-leiloes.vercel.app/imagens/genio-leiloes.webp"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://genio-leiloes.vercel.app" />
      </Helmet>
      <Template showFilters cityFilterOptions={cityFilterOptions}>
        <div className="grid grid-cols-12 gap-4">
          {listAuction.isLoading ? (
            <SkeletonLoaderGrid count={24} />
          ) : (
            vehicleList?.map((item) => (
              <AuctionCard
                key={item.id}
                currentVehicleLoading={currentVehicleStatus.isLoading}
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
    </>
  )
}
