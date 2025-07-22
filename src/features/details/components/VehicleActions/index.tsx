import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'
import { auctionHammer } from '@/assets/icons'
import { Link } from '@tanstack/react-router'
import { Heart, HeartOff } from 'lucide-react' // Ícones do Lucide
import { useState } from 'react'
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useFavoriteVehicle } from '@/features/home/hooks/use-favorite-vehicle'

interface VehicleActionsProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
    is_favorite?: boolean // Adicione esta propriedade se existir na API
  }
  currentLink: string
}

export function VehicleActions({
  vehicleData,
  currentLink,
}: VehicleActionsProps) {
  const [isFavorite, setIsFavorite] = useState(vehicleData.is_favorite || false)
  const { userProfile } = useUserStore()
  const { mutate: favoriteVehicle, isPending } = useFavoriteVehicle()
  const params = new URLSearchParams(currentLink)
  const vehicleId = params.get('data')
  const vehicleLink = `https://leilao.detran.mg.gov.br/lotes/detalhes/${vehicleId}`

  const handleFavorite = () => {
    if (!userProfile) {
      toast({
        description: 'Faça login para favoritar veículos',
        variant: 'info',
      })
      return
    }

    favoriteVehicle(vehicleData.lote_id, {
      onSuccess: () => {
        setIsFavorite(!isFavorite)
      },
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row gap-3 pt-4"
    >
      <VehicleAnalysisDialog vehicleData={vehicleData} />

      <Button
        variant="ghost"
        size="lg"
        className={`w-full sm:w-auto group transition-colors ${
          isFavorite
            ? 'text-red-500 hover:bg-red-50'
            : 'text-muted-foreground hover:text-primary'
        }`}
        onClick={handleFavorite}
        disabled={isPending}
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          {isFavorite ? (
            <HeartOff className="w-5 h-5 fill-current" />
          ) : (
            <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:stroke-red-500 transition-colors" />
          )}
        </motion.div>
        <span className="ml-2">{isFavorite ? 'Remover' : 'Favoritar'}</span>
      </Button>

      <a href={vehicleLink} target="_blank" className="ml-4">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Ir para o leilão {auctionHammer}
        </Button>
      </a>
    </motion.div>
  )
}
