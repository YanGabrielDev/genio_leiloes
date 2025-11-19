import { Button } from '@/components/ui/button'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { toast } from '@/hooks/use-toast'
import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { ReactNode } from 'react'

interface VehicleDetailsHeaderProps {
  vehicleMarcaModelo: string
  leilaoNome: string
  veihcleYear: number
  vehicleId: number
  extraInfo?: ReactNode
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehicleDetailsHeader({
  vehicleMarcaModelo,
  leilaoNome,
  veihcleYear,
  vehicleId,
  extraInfo,
}: VehicleDetailsHeaderProps) {
  const { data: favoriteItems } = useListFavorite()
  const { mutate: favoriteVehicle } = useFavoriteVehicle()
  const { userProfile } = useUserStore()
  const favoriteItemids = favoriteItems?.map((item) => item.id)
  const isFavorite = favoriteItemids?.includes(vehicleId)
  const navigate = useNavigate()
  const handleFavorite = () => {
    if (!userProfile) {
      toast({
        description: 'Faça login para favoritar veículos',
        variant: 'info',
      })
      setTimeout(() => {
        navigate({ to: '/login' })
      }, 2000)
      return
    }

    favoriteVehicle(vehicleId)
  }

  return (
    <motion.div
      variants={fadeIn}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-start text-sm   flex-col">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            {vehicleMarcaModelo} {extraInfo}
          </h2>
          <p className="text-gray-600">{veihcleYear}</p>
        </div>
        <div className="flex text-xs text-gray-500">
          <span>Leilões</span>
          <span className="mx-2">/</span>
          <span className="truncate max-w-48">{leilaoNome}</span>
        </div>
      </div>
      <div>
        {/* Favorite Button (mantido para funcionalidade de exemplo) */}
        <Button
          variant="ghost"
          size="icon"
          className=" bg-white/80 backdrop-blur-sm hover:bg-white shadow"
          onClick={() => handleFavorite()}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </Button>
      </div>
    </motion.div>
  )
}
