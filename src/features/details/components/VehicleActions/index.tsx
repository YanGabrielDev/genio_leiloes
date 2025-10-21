import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'
import { ConsultancyDialog } from '../ConsultancyDialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { AlertTriangle, ExternalLink, Sparkles } from 'lucide-react'
import { auctionHammer } from '@/assets/icons'
import { SendOffer } from '../SendOffer'

interface VehicleActionsProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
    vehicleId: number
    is_favorite?: boolean
    encerrado?: boolean
  }
  currentLink: string
}

export function VehicleActions({
  vehicleData,
  currentLink,
}: VehicleActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-20 bg-white p-4 border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sm:relative sm:bg-transparent sm:p-0 sm:border-0 sm:shadow-none sm:pt-4"
    >
      {vehicleData.encerrado ? (
        <div className="text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
          Este leilão já foi encerrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-row sm:gap-4 items-center">
          <VehicleAnalysisDialog
            vehicleData={vehicleData}
            disabled={vehicleData.encerrado}
          />

          <ConsultancyDialog
            vehicleData={vehicleData}
            id="tour-consultancy"
            disabled={vehicleData.encerrado}
          />

          <SendOffer
            vehicleId={vehicleData.lote_id}
            disabled={vehicleData.encerrado}
          />
        </div>
      )}
    </motion.div>
  )
}
