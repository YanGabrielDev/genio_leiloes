// src/components/FavoritesDrawer.tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { HeartOff, ArrowRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
// import { VehicleCard } from './VehicleCard'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'

export function FavoritesDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { data: favorites, isLoading, isError } = useListFavorite()
  const navigate = useNavigate()

  //   const handleNavigateToVehicle = (vehicleId: number) => {
  //     navigate({ to: '/vehicle/$id', params: { id: String(vehicleId) } })
  //     onOpenChange(false)
  //   }
  //   console.log({ favorites })

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Meus Favoritos</DrawerTitle>
          </DrawerHeader>

          {/* <div className="p-4 pb-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-8">
                <p>Erro ao carregar favoritos</p>
              </div>
            ) : favorites?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <HeartOff className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  Nenhum veículo favoritado ainda
                </p>
                <Button onClick={() => onOpenChange(false)}>
                  Explorar veículos
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites?.map((vehicle) => (
                  <div 
                    key={vehicle.lote_id} 
                    className="relative group cursor-pointer"
                    onClick={() => handleNavigateToVehicle(vehicle.lote_id)}
                  >
                    <VehicleCard vehicle={vehicle} compact />
                    <ArrowRight className="absolute right-4 bottom-4 h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
