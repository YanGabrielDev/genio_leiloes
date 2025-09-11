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
  }
  currentLink: string
}

export function VehicleActions({
  vehicleData,
  currentLink,
}: VehicleActionsProps) {
  const params = new URLSearchParams(currentLink)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 pt-4"
    >
      <VehicleAnalysisDialog vehicleData={vehicleData} />

      <ConsultancyDialog vehicleData={vehicleData} id="tour-consultancy" />

      <SendOffer vehicleId={vehicleData.lote_id} />
    </motion.div>
  )
}
