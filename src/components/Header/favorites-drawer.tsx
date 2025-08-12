// src/components/FavoritesDrawer.tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { useNavigate } from '@tanstack/react-router'
import { SkeletonLoaderGrid } from '../SkeletonLoaderGrid'
import { AuctionCard } from '@/features/home/components/AuctionCard'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { UseQueryResult } from '@tanstack/react-query'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'

export function FavoritesDrawer({
  open,
  onOpenChange,
  listFavorite,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  listFavorite: UseQueryResult<Vehicles[], Error>
}) {
  const navigate = useNavigate()
  const { mutate: toggleFavorite } = useFavoriteVehicle()

  const handleNavigateToVehicle = (vehicleId: number) => {
    navigate({
      to: '/details/$vehicleId',
      params: { vehicleId: String(vehicleId) },
    })
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full max-w-7xl px-4">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl font-bold">
              Meus Favoritos
            </DrawerTitle>
            <DrawerDescription>
              {listFavorite.data?.length || 0} veículos salvos
            </DrawerDescription>
          </DrawerHeader>

          <div className="pb-6 px-4">
            {listFavorite.isLoading ? (
              <SkeletonLoaderGrid count={6} />
            ) : listFavorite.data?.length === 0 ? (
              //   <EmptyState
              //     icon={<HeartOff className="h-12 w-12 text-muted-foreground" />}
              //     title="Nenhum veículo favoritado"
              //     description="Comece a favoritar veículos para vê-los aqui"
              //     action={
              <Button onClick={() => onOpenChange(false)}>
                Explorar veículos
              </Button>
            ) : (
              //     }
              //   />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listFavorite.data?.map((item) => (
                  <div
                    key={item.id}
                    className="relative group"
                    onClick={() => handleNavigateToVehicle(item.id)}
                  >
                    <AuctionCard
                      currentVehicleLoading={listFavorite.isLoading}
                      vehicle={item}
                      onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                    <ArrowRight className="absolute right-4 top-4 h-5 w-5 text-white bg-primary/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
