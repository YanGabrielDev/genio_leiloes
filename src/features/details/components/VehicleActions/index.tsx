import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'
import { auctionHammer } from '@/assets/icons'
import { Link } from '@tanstack/react-router'

interface VehicleActionsProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
  }
  currentLink: string
}

export function VehicleActions({
  vehicleData,
  currentLink,
}: VehicleActionsProps) {
  const params = new URLSearchParams(currentLink)
  const vehicleId = params.get('data')
  const vehicleLink = `https://leilao.detran.mg.gov.br/lotes/detalhes/${vehicleId}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row gap-3 pt-4"
    >
      <VehicleAnalysisDialog vehicleData={vehicleData} />
      <Button variant="outline" size="lg" className="w-full sm:w-auto">
        Adicionar à lista
      </Button>
      {/* <Button variant="ghost" size="lg" className="w-full sm:w-auto"> */}
      <a href={vehicleLink} target="_blank" className="ml-4">
        {auctionHammer}
      </a>

      {/* </Button> */}
    </motion.div>
  )
}
