import { lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const VehicleLocationMap = lazy(() =>
  import('@/features/details/components/VehicleLocationMap').then((module) => ({
    default: module.VehicleLocationMap,
  }))
)

interface VehicleSpecificationsProps {
  year: string | number
  color: string
  leilaoName: string
  leilaoState: string
  latitude: number
  longitude: number
}

export function VehicleSpecifications({
  year,
  color,
  leilaoName,
  leilaoState,
  latitude,
  longitude,
}: VehicleSpecificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Ano</p>
        <p className="text-base font-semibold">{year || 'Não informado'}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Cor</p>
        <p className="text-base font-semibold">{color || 'Não informada'}</p>
      </div>
      <div className="space-y-1 col-span-1 md:col-span-2">
        <p className="text-sm font-medium text-muted-foreground">Localização</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">
            {leilaoName}, {leilaoState}
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-primary"
              >
                (ver no mapa)
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh]">
              <DialogHeader>
                <DialogTitle>Localização do Leilão</DialogTitle>
              </DialogHeader>
              <Suspense fallback={<div>Carregando mapa...</div>}>
                <VehicleLocationMap
                  latitude={latitude}
                  longitude={longitude}
                  locationName={leilaoName}
                />
              </Suspense>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
