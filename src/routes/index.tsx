// src/pages/AppPage.tsx
import { AuctionCard } from '@/features/home/components/AuctionCard'
import { PaginationSection } from '@/components/PaginationSection'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { Template } from '@/components/Template'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useListAuction } from '@/features/home/hooks/use-list-auction'
import { auctionMock } from '@/mock/auction.mock'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { useListSubscriptionsPlans } from '@/features/account/hooks/use-list-subscriptions-plans'
import { useUserStore } from '@/store/user.store'
import { useListCurrentVehicleStatus } from '@/features/home/hooks/use-check-current-vehicle-status'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { Helmet } from 'react-helmet-async'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { toast } from '@/hooks/use-toast'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'
import { AppTour } from '@/components/Tour'
import { LandingPage } from '@/features/home/components/LandingPage'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gênio Leilões',
  url: 'https://genio-leiloes.vercel.app',
  logo: 'https://genio-leiloes.vercel.app/imagens/genio_icon.png',
  description:
    'Plataforma de leilões de veículos com avaliação inteligente por IA para ajudar compradores a fazerem os melhores lances.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como funcionam as análises com Inteligência Artificial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nossa IA avalia o veículo, estima custos e aponta possíveis problemas com base em dados reais do mercado, histórico e estado do carro.',
      },
    },
    {
      '@type': 'Question',
      name: 'Como funciona a criação de alertas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cadastre seus critérios (modelo, ano, preço, local) e receba alertas sempre que um carro com o seu perfil entrar em leilão.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais os benefícios de usar o Gênio Leilões?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Com o Gênio Leilões você economiza horas pesquisando, evita comprar carros-problema, aumenta suas chances de lucro com dados confiáveis e tem confiança para dar o lance certo.',
      },
    },
  ],
}

export const Route = createFileRoute('/')({
  component: AppPage,
})

function AppPage() {
  const [page, setPage] = useState<number>(1)
  const { vehicleFiltersState } = useVehicleFilters()
  const { data: favoriteItems } = useListFavorite()
  const { data: subscriptionPlans, isLoading: isLoadingSubscriptionPlans } =
    useListSubscriptionsPlans()
  const { setUserPlan, userProfile } = useUserStore()
  const { mutate: toggleFavorite } = useFavoriteVehicle()
  const favoriteItemids = favoriteItems?.map((item) => item.id)

  const {
    priceRange: [priceMin, priceMax],
    brandModelSearch,
    year,
    condition,
    city,
  } = vehicleFiltersState

  // Check if any filter is active
  const isAnyFilterActive =
    priceMin > 0 ||
    priceMax < 100000 ||
    brandModelSearch !== '' ||
    year !== undefined ||
    condition !== undefined ||
    city !== undefined

  const listAuction = useListAuction({
    page,
    priceMax,
    priceMin,
    modelBrand: brandModelSearch,
    year,
    condition,
    city,
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
        value: auction,
        label: auction,
        id: crypto.randomUUID(),
      })),
    []
  )
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

  const handlePageChange = (newPage: number) => setPage(newPage)

  useEffect(() => {
    if (subscriptionPlans) setUserPlan(subscriptionPlans)
  }, [isLoadingSubscriptionPlans, subscriptionPlans])

  // Lógica para pegar o ID do primeiro veículo e passar para o Tour
  const firstVehicleId = vehicleList?.[0]?.id

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
          content="https://genio-leiloes.vercel.app/imagens/genio_icon.png"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://genio-leiloes.vercel.app" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Template showFilters cityFilterOptions={cityFilterOptions}>
        {/* {!isAnyFilterActive && <LandingPage />} */}
        <div id="vehicle-list" className={!isAnyFilterActive ? 'pt-10' : ''}>
          <h2 className="text-2xl font-bold mb-4">Veículos Disponíveis:</h2>
          <div className="grid grid-cols-12 gap-4">
            {listAuction.isLoading ? (
              <SkeletonLoaderGrid count={24} />
            ) : (
              vehicleList?.map((item, index) => (
                <AuctionCard
                  key={item.id}
                  // Aplica o ID apenas no primeiro card para o tour
                  id={index === 0 ? 'tour-card' : undefined}
                  vehicle={item as Vehicles}
                  onToggleFavorite={handleFavorite}
                  isFavorite={favoriteItemids?.includes(item.id)}
                  currentVehicleLoading={currentVehicleStatus.isLoading}
                />
              ))
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center mb-8 mt-8">
          <PaginationSection
            page={page}
            handleChangePage={handlePageChange}
            totalItems={listAuction.data?.count ?? 0}
          />
        </div>
      </Template>
      {/* Passe o ID do veículo para o AppTour */}
      {!listAuction.isLoading && firstVehicleId && (
        <AppTour firstVehicleId={firstVehicleId} />
      )}
    </>
  )
}
