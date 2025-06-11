import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'

interface VehicleActionsProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
  }
}

export function VehicleActions({ vehicleData }: VehicleActionsProps) {
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
    </motion.div>
  )
}
