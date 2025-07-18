// src/routes/details.$vehicleId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { Template } from '@/components/Template'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useFindVehicleById } from '@/features/details/hooks/findVehicleById'
import { VehicleActions } from '@/features/details/components/VehicleActions'
import { VehicleDetailsHeader } from '@/features/details/components/VehicleDetailsHeader'
import { VehicleImageCarousel } from '@/features/details/components/VehicleImageCarousel'
import { VehicleInfoCards } from '@/features/details/components/VehicleInfoCards'
import { VehiclePriceDisplay } from '@/features/details/components/VehiclePriceDisplay'
import { useFindVehicleCurrentStatusById } from '@/features/details/hooks/use-find-vehicle-current-status-by-id'
import { getCurrentVehicleId } from '@/utils/getCurrentVehicleId'
import { useStore } from 'zustand'
import { useUserStore } from '@/store/user.store'
import { Card } from '@/components/ui/card'

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
  const vehicleCurrentStatusById = useFindVehicleCurrentStatusById({
    vehicleId: getCurrentVehicleId(vehicle?.link_lance_atual ?? ''),
  })
  const { plan } = useUserStore()

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
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <VehicleImageCarousel
          images={vehicle.imagens}
          marcaModelo={vehicle.marca_modelo}
        />

        <motion.div variants={fadeIn} className="space-y-6">
          {/* Adicionando o card de análises disponíveis */}
          {plan && (
            <Card className="border-primary p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-primary">Análises com IA</h3>
                  <p className="text-sm text-muted-foreground">
                    Você ainda possui{' '}
                    {plan.user_plan.plan.requests_ai -
                      plan.user_plan.requests_ai_used}{' '}
                    análises disponíveis este mês
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="border-primary text-primary"
                >
                  {plan.user_plan.plan.title}
                </Badge>
              </div>
            </Card>
          )}

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold tracking-tight"
            >
              {vehicle.marca_modelo}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mt-2"
            >
              <Badge variant="secondary" className="text-sm">
                Lote: {vehicle.lote}
              </Badge>
              <Badge
                variant={
                  vehicle.condicao === 'Sucata' ? 'destructive' : 'outline'
                }
              >
                {vehicle.condicao || 'Condição não informada'}
              </Badge>
            </motion.div>
          </div>

          <VehiclePriceDisplay
            evaluationValue={evaluationValue}
            loading={vehicleCurrentStatusById.isLoading}
          />

          <VehicleInfoCards
            year={vehicle.ano}
            color={vehicle.cor}
            leilaoName={vehicle.leilao.nome}
            leilaoState={vehicle.leilao.estado}
          />

          <VehicleActions
            vehicleData={{
              ano: vehicle.ano,
              avaliacao: evaluationValue,
              imagens: vehicle.imagens,
              marca_modelo: vehicle.marca_modelo,
              lote_id: Number(vehicle.lote),
            }}
            currentLink={vehicle.link_lance_atual}
          />
        </motion.div>
      </div>
    </Template>
  )
}
