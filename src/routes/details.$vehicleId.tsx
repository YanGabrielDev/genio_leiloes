// src/routes/details.$vehicleId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Template } from '@/components/Template'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useFindVehicleById } from '@/features/details/hooks/findVehicleById'
import { VehicleActions } from '@/features/details/components/VehicleActions'
import { VehicleDetailsHeader } from '@/features/details/components/VehicleDetailsHeader'
import { VehicleImageCarousel } from '@/features/details/components/VehicleImageCarousel'
import { VehicleInfoCards } from '@/features/details/components/VehicleInfoCards'
import { VehiclePriceDisplay } from '@/features/details/components/VehiclePriceDisplay'
import { useFindVehicleCurrentStatusById } from '@/features/details/hooks/use-find-vehicle-current-status-by-id'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { useListLastMoves } from '@/features/details/hooks/use-list-last-moves'

export const Route = createFileRoute('/details/$vehicleId')({
  component: VehicleDetailsPage,
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

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
  const { data: favoriteItems } = useListFavorite()

  const favoriteItemids = favoriteItems?.map((item) => item.id)
  const vehicleCurrentStatusById = useFindVehicleCurrentStatusById({
    vehicleId: getCurrentVehicleId(vehicle?.link_lance_atual ?? ''),
  })

  // --- Loading State ---
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

  // --- Error State ---
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

  // --- Not Found State ---
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

  // --- Main Content ---
  return (
    <Template toGo="/">
      <VehicleDetailsHeader
        leilaoNome={vehicle.leilao.nome}
        vehicleMarcaModelo={vehicle.marca_modelo}
        veihcleYear={vehicle.ano}
        vehicleId={vehicle.id}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VehicleImageCarousel
          images={vehicle.imagens}
          marcaModelo={vehicle.marca_modelo}
        />

        <motion.div variants={fadeIn} className="space-y-6">
          <VehiclePriceDisplay
            evaluationValue={evaluationValue}
            loading={vehicleCurrentStatusById.isLoading}
          />

          <VehicleInfoCards
            year={vehicle.ano}
            color={vehicle.cor}
            leilaoName={vehicle.leilao.nome}
            leilaoState={vehicle.leilao.estado}
            leilaoData={listLastMoves}
            isLoadingLeilaoData={isLoadingListLastMoves}
          />

          <VehicleActions
            vehicleData={{
              ano: vehicle.ano,
              avaliacao: evaluationValue,
              imagens: vehicle.imagens,
              marca_modelo: vehicle.marca_modelo,
              lote_id: Number(vehicle.lote),
              vehicleId: vehicle.id,
              is_favorite: favoriteItemids?.includes(vehicle.id),
            }}
            currentLink={vehicle.link_lance_atual}
          />
        </motion.div>
      </div>
    </Template>
  )
}
