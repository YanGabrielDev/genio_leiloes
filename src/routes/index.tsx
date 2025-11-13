import { AuctionCard } from '@/features/home/components/AuctionCard'
import { SkeletonLoaderGrid } from '@/components/SkeletonLoaderGrid'
import { Template } from '@/components/Template'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useListAuction } from '@/features/home/hooks/use-list-auction'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
import { useListAuctionCities } from '@/features/home/hooks/use-list-auction-cities'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'
import { PaginationSection } from '@/components/PaginationSection'
import { useTour } from '@/context/tour.context'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gênio Leilões',
  url: 'https://genio-leiloes.com',
  logo: 'https://genio-leiloes.com/imagens/genio_icon.png',
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
  validateSearch: (search: Record<string, unknown>) => ({
    city: search.city as string | undefined,
  }),
  component: AppPage,
})

function AppPage() {
  const [page, setPage] = useState<number>(1)
  const { city: cityParam } = Route.useSearch()
  const navigate = useNavigate({ from: Route.id })
  const { run: runTour, setRun: setRunTour } = useTour()
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
  const { data: favoriteItems } = useListFavorite()
  const { data: subscriptionPlans, isLoading: isLoadingSubscriptionPlans } =
    useListSubscriptionsPlans()
  const { setUserPlan, userProfile } = useUserStore()
  const { mutate: toggleFavorite } = useFavoriteVehicle()
  const { data: listAuctionCities, isLoading: isLoadingListAuctionCities } =
    useListAuctionCities()
  const favoriteItemids = favoriteItems?.map((item) => item.id)

  const {
    priceRange: [priceMin, priceMax],
    brandModelSearch,
    year,
    condition,
    city,
    auctionStatus,
  } = vehicleFiltersState

  const listScrapAuction = useListAuction({
    page,
    priceMax,
    priceMin,
    modelBrand: brandModelSearch,
    year,
    condition: 'sucata',
    city,
    auctionStatus,
  })
  const listNoScrapAuction = useListAuction({
    page,
    priceMax,
    priceMin,
    modelBrand: brandModelSearch,
    year,
    condition: 'conservado',
    city,
    auctionStatus,
  })

  const scrapVehicles = listScrapAuction.data?.results
  const noScrapvehicles = listNoScrapAuction.data?.results

  const currentScrapVehicleStatus = useListCurrentVehicleStatus({
    dataList: scrapVehicles?.map((vehicle) => {
      if (!vehicle) return null
      const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
      return vehicleId
    }),
  })
  const currentNoScrapVehicleStatus = useListCurrentVehicleStatus({
    dataList: noScrapvehicles?.map((vehicle) => {
      if (!vehicle) return null
      const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
      return vehicleId
    }),
  })

  const noScrapVehicleList = noScrapvehicles?.map((vehicle) => {
    const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
    const currentVehicle = vehicleId
      ? currentNoScrapVehicleStatus?.data?.[Number(vehicleId)]
      : null
    const currentValue = currentVehicle?.valor
    return {
      ...vehicle,
      avaliacao_atualizada: currentValue,
      encerrado: !!currentVehicle?.arrematante,
    }
  })

  const scrapVehicleList = scrapVehicles?.map((vehicle) => {
    const vehicleId = getCurrentVehicleId(vehicle.link_lance_atual)
    const currentVehicle = vehicleId
      ? currentScrapVehicleStatus?.data?.[Number(vehicleId)]
      : null
    const currentValue = currentVehicle?.valor
    return {
      ...vehicle,
      avaliacao_atualizada: currentValue,
      encerrado: !!currentVehicle?.arrematante,
    }
  })

  const cityFilterOptions = useMemo(
    () =>
      listAuctionCities?.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
        id: auction.id,
      })),
    [listAuctionCities, isLoadingListAuctionCities]
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

  useEffect(() => {
    if (cityParam) {
      setVehicleFiltersState((prevState) => ({
        ...prevState,
        city: cityParam,
      }))

      navigate({
        search: (prev) => {
          return { ...prev }
        },
        replace: true,
      })
    }
  }, [cityParam, setVehicleFiltersState, navigate])

  const firstVehicleId = noScrapVehicleList?.[0]?.id

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
        <meta property="og:url" content="https://genio-leiloes.com" />
        <meta
          name="google-site-verification"
          content="WFx8v4XixaF4MN5UbfYXw0Y_smLNfhITzP5BmE7wUyk"
        />
        <meta
          property="og:image"
          content="https://genio-leiloes.com/imagens/genio_icon.png"
        />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://genio-leiloes.com" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Template showFilters cityFilterOptions={cityFilterOptions}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold hidden md:block">
            Veículos Disponíveis:
          </h2>
          {/* <div className="bg-white p-2 md:p-4 rounded-lg shadow-sm w-full md:w-auto flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4 border">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Status do leilão:
            </span>
            <Tabs
              value={auctionStatus || 'todos'}
              onValueChange={(value) =>
                setVehicleFiltersState((prevState) => ({
                  ...prevState,
                  auctionStatus:
                    value === 'todos'
                      ? undefined
                      : (value as 'Em andamento' | 'Publicado'),
                }))
              }
            >
              <TabsList>
                <TabsTrigger
                  value="todos"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Todos
                </TabsTrigger>
                <TabsTrigger
                  value="Em andamento"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Em andamento
                </TabsTrigger>
                <TabsTrigger
                  value="Publicado"
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Publicado
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div> */}
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          {listNoScrapAuction.isLoading || listScrapAuction.isLoading ? (
            <SkeletonLoaderGrid count={24} />
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Conservados</h3>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {noScrapVehicleList?.map((item) => (
                      <CarouselItem
                        key={item.id}
                        className="basis-2/3 md:basis-1/2 lg:basis-1/4"
                      >
                        <AuctionCard
                          vehicle={item}
                          onToggleFavorite={handleFavorite}
                          isFavorite={favoriteItemids?.includes(item.id)}
                          currentVehicleLoading={
                            currentNoScrapVehicleStatus.isLoading
                          }
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Sucatas</h3>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {scrapVehicleList?.map((item) => (
                      <CarouselItem
                        key={item.id}
                        className="basis-2/3 md:basis-1/2 lg:basis-1/4"
                      >
                        <AuctionCard
                          vehicle={item}
                          onToggleFavorite={handleFavorite}
                          isFavorite={favoriteItemids?.includes(item.id)}
                          currentVehicleLoading={
                            currentScrapVehicleStatus.isLoading
                          }
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>
            </>
          )}
        </div>
        {/* <div className="w-full flex items-center justify-center mb-8 mt-8">
          <PaginationSection
            page={page}
            handleChangePage={handlePageChange}
            totalItems={listAuction.data?.count ?? 0}
          />
        </div> */}
      </Template>
      {!listNoScrapAuction.isLoading ||
        (!listScrapAuction.isLoading && (
          <AppTour
            run={runTour}
            setRun={setRunTour}
            firstVehicleId={firstVehicleId}
          />
        ))}
      <Button
        onClick={() => setRunTour(true)}
        className="fixed md:bottom-8 bottom-20 right-6 h-14 w-14 rounded-full shadow-lg z-40"
        aria-label="Iniciar tour"
      >
        <HelpCircle className="h-7 w-7" />
      </Button>
    </>
  )
}
