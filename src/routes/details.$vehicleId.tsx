// src/routes/details.$vehicleId.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetVehicleById } from '@/hooks/useGetVehicleById'
import { Template } from '@/components/Template'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import { usePostAnalysis } from '@/hooks/usePostAnalysis'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export const Route = createFileRoute('/details/$vehicleId')({
  component: VehicleDetailsPage,
})

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function VehicleDetailsPage() {
  const { vehicleId } = Route.useParams()
  const {
    data: vehicle,
    isLoading,
    isError,
  } = useGetVehicleById({ vehicleId: Number(vehicleId) })
  const {
    mutateAsync: postAnalysis,
    data: analysis,
    isPending: analysisIsPending,
  } = usePostAnalysis()
  console.log(analysis)

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
        <div className="container mx-auto p-4 text-center">
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

  return (
    <Template toGo="/">
      <motion.div
        variants={fadeIn}
        className="flex items-center text-sm text-muted-foreground mb-6"
      >
        <span>Leilões</span>
        <span className="mx-2">/</span>
        <span>{vehicle.leilao.nome}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">
          {vehicle.marca_modelo}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Carrossel de Imagens */}
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {vehicle.imagens.map((img, index) => (
                  <CarouselItem key={index}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative aspect-video overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${vehicle.marca_modelo} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {vehicle.imagens.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
                </>
              )}
            </Carousel>
          </Card>
        </motion.div>

        {/* Detalhes do Veículo */}
        <motion.div variants={fadeIn} className="space-y-6">
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

          {/* Valor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                Valor de avaliação
              </p>
              <p className="text-3xl font-bold text-primary">
                R${' '}
                {parseFloat(vehicle.avaliacao).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </motion.div>

          {/* Informações do Veículo */}
          <motion.div
            variants={fadeIn}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ano
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {vehicle.ano || 'Não informado'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {vehicle.cor || 'Não informada'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Leilão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{vehicle.leilao.nome}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">
                  {vehicle.leilao.estado || 'Não informada'}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                  variant="primary"
                  onClick={() =>
                    postAnalysis({
                      ano: String(vehicle.ano),
                      avaliacao: vehicle.avaliacao,
                      imagens: [vehicle.imagens[0]],
                      marca_modelo: vehicle.marca_modelo,
                    })
                  }
                >
                  Analisar com IA
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl max-h-96 overflow-auto">
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {analysisIsPending ? (
                      <span>Realizando analise...</span>
                    ) : (
                      <span>{analysis}</span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Adicionar à lista
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Template>
  )
}
