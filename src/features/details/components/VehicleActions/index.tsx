// VehicleActions.tsx

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'
import { auctionHammer } from '@/assets/icons'
import { ConsultancyDialog } from '../ConsultancyDialog'

interface VehicleActionsProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
    vehicleId: number
    is_favorite?: boolean
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
      className="flex flex-col sm:flex-row gap-4 pt-4"
    >
      {/* NOVO POSICIONAMENTO: Avaliação Inteligente agora é o primeiro botão */}
      <VehicleAnalysisDialog vehicleData={vehicleData} />
      {/* Outros botões em seguida */}
      <a href={vehicleLink} target="_blank" id="tour-go-to-auction">
        <Button variant="outline" className="w-full sm:w-auto">
          {' '}
          Ir para o leilão {auctionHammer}
        </Button>
      </a>
      <ConsultancyDialog vehicleData={vehicleData} id="tour-consultancy" />
    </motion.div>
  )
}
