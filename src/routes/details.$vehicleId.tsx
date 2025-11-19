import { createFileRoute } from '@tanstack/react-router'
import { Template } from '@/components/Template'
import { Skeleton } from '@/components/ui/skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useFindVehicleById } from '@/features/details/hooks/use-find-vehicle-by-id'
import { VehicleActions } from '@/features/details/components/VehicleActions'
import { VehicleDetailsHeader } from '@/features/details/components/VehicleDetailsHeader'
import { VehicleImageCarousel } from '@/features/details/components/VehicleImageCarousel'
import { VehicleInfoCards } from '@/features/details/components/VehicleInfoCards'
import { VehiclePriceDisplay } from '@/features/details/components/VehiclePriceDisplay'
import { useFindVehicleCurrentStatusById } from '@/features/details/hooks/use-find-vehicle-current-status-by-id'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { useListLastMoves } from '@/features/details/hooks/use-list-last-moves'
import { useEffect, useState, lazy, Suspense } from 'react'
import { AppTour } from '@/components/Tour'
import { RelatedVehicles } from '@/features/details/components/RelatedVehicles'
import { useTour } from '@/context/tour.context'
import { Helmet } from 'react-helmet-async'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Gavel, MapPin } from 'lucide-react'

const VehicleLocationMap = lazy(() =>
  import('@/features/details/components/VehicleLocationMap').then((module) => ({
    default: module.VehicleLocationMap,
  })),
)

export const Route = createFileRoute('/details/$vehicleId')({
  component: VehicleDetailsPage,
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
const benefits = [
  '⚡ Tabela FIPE atualizada',
  '💰 Custos mensais do veículo',
  '🔧 Problemas crônicos conhecidos',
  '✅ Avaliação: vale a pena ou não?',
  '📸 Detecção de danos nas imagens',
]

function VehicleDetailsPage() {
  const { vehicleId } = Route.useParams()
  const {
    data: vehicle,
    isLoading,
    isError,
  } = useFindVehicleById({ vehicleId: Number(vehicleId) })
  const { data: listLastMoves, isLoading: isLoadingListLastMoves } =
    useListLastMoves({
      vehicleId: Number(vehicle?.lote),
    })
  const { run, setRun } = useTour()
  const { data: favoriteItems } = useListFavorite()

  const favoriteItemids = favoriteItems?.map((item) => item.id)
  const vehicleCurrentStatusById = useFindVehicleCurrentStatusById({
    vehicleId: getCurrentVehicleId(vehicle?.link_lance_atual ?? ''),
  })
  const encerrado = !!vehicleCurrentStatusById.data?.arrematante
  const [currentBenefit, setCurrentBenefit] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefit((prev) => (prev + 1) % benefits.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <Template>
        <div className="container mx-auto p-4 space-y-6">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-96 w-full rounded-xl" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Template>
    )
  }

  if (isError) {
    return (
      <Template>
        <div className="container mx-auto p-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-destructive/10 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-destructive mb-2">
              Erro ao carregar veículo
            </h2>
            <p className="text-muted-foreground">
              Tente recarregar a página ou verifique o ID do veículo
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Recarregar
            </Button>
          </motion.div>
        </div>
      </Template>
    )
  }

  if (!vehicle) {
    return (
      <Template>
        <div className="container mx-auto p-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-background p-8 rounded-lg border border-border"
          >
            <h2 className="text-2xl font-bold mb-2">Veículo não encontrado</h2>
            <p className="text-muted-foreground">
              O veículo solicitado não existe ou foi removido
            </p>
          </motion.div>
        </div>
      </Template>
    )
  }

  const evaluationValue =
    vehicleCurrentStatusById.data?.valor ?? vehicle.avaliacao

  const vehicleName = `${vehicle.marca_modelo} ${vehicle.ano}`
  const description = `Participe do leilão para este ${vehicle.marca_modelo} ano ${vehicle.ano}, cor ${vehicle.cor}. Leilão: ${vehicle.leilao.nome}.`
  const imageUrl = vehicle.imagens?.[0]
  const productUrl = `https://genio-leiloes.com/details/${vehicle.id}`

  return (
    <Template toGo="/">
      <Helmet>
        <title>{`${vehicleName} | Gênio Leilões`}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={vehicleName} />
        <meta property="og:description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={vehicleName} />
        <meta name="twitter:description" content={description} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      </Helmet>
      <VehicleDetailsHeader
        leilaoNome={vehicle.leilao.nome}
        vehicleMarcaModelo={vehicle.marca_modelo}
        veihcleYear={vehicle.ano}
        vehicleId={vehicle.id}
        extraInfo={
          encerrado && (
            <Badge variant="destructive" className="ml-2">
              Encerrado
            </Badge>
          )
        }
      />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <VehicleImageCarousel
              images={vehicle.imagens}
              marcaModelo={vehicle.marca_modelo}
            />
          </div>
          <motion.div
            id="tour-detalhes-veiculo"
            variants={fadeIn}
            className="space-y-6"
          >
            <VehiclePriceDisplay
              evaluationValue={evaluationValue}
              loading={vehicleCurrentStatusById.isLoading}
            />
            {encerrado && vehicleCurrentStatusById.data?.arrematante && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg my-4"
                  role="alert"
                >
                  <div className="flex items-center gap-3">
                    <Gavel className="h-6 w-6" />
                    <div>
                      <p className="font-bold">Leilão Encerrado!</p>
                      <p className="text-sm">
                        Arrematado por:{' '}
                        <span className="font-semibold">
                          {vehicleCurrentStatusById.data.arrematante}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
            <VehicleActions
              vehicleData={{
                ano: vehicle.ano,
                avaliacao: evaluationValue,
                imagens: vehicle.imagens,
                marca_modelo: vehicle.marca_modelo,
                lote_id: Number(vehicle.lote),
                vehicleId: vehicle.id,
                is_favorite: favoriteItemids?.includes(vehicle.id),
                encerrado,
              }}
              currentLink={vehicle.link_lance_atual}
            />

            <div className="flex items-center gap-4 flex-col md:flex-row">
              <span className="text-primary text-sm">
                Benefícios da Avaliação inteligente:
              </span>
              <motion.div
                key={currentBenefit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {benefits[currentBenefit]}
              </motion.div>
            </div>
            <VehicleInfoCards
              year={vehicle.ano}
              color={vehicle.cor}
              leilaoName={vehicle.leilao.nome}
              leilaoState={vehicle.leilao.cidade}
              leilaoData={listLastMoves}
              restTime={vehicle?.tempo_restante}
              isLoadingLeilaoData={isLoadingListLastMoves}
              latitude={vehicle.leilao.latitude}
              longitude={vehicle.leilao.longitude}
            />
          </motion.div>
        </div>
      </div>
      <RelatedVehicles
        brand={vehicle.marca_modelo.split(' ')[0]}
        currentVehicleId={vehicle.id}
      />
      <AppTour run={run} setRun={setRun} />
    </Template>
  )
}
