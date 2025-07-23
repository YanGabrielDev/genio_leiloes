// src/components/FavoritesDrawer.tsx
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useNavigate } from '@tanstack/react-router'
// import { VehicleCard } from './VehicleCard'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { SkeletonLoaderGrid } from '../SkeletonLoaderGrid'
import { AuctionCard } from '@/features/home/components/AuctionCard'

export function FavoritesDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const listFavorite = useListFavorite()
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

          {listFavorite.isLoading ? (
            <SkeletonLoaderGrid count={24} />
          ) : (
            listFavorite.data?.map((item) => (
              <AuctionCard
                key={item.id}
                currentVehicleLoading={listFavorite.isLoading}
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
      </DrawerContent>
    </Drawer>
  )
}
