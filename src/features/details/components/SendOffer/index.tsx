import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AlertTriangle, ExternalLink, Sparkles } from 'lucide-react'
import { auctionHammer } from '@/assets/icons'
import { useState } from 'react'

interface SendOfferProps {
  vehicleId: number
  disabled?: boolean
}

export const SendOffer = ({ vehicleId, disabled }: SendOfferProps) => {
  const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  const vehicleLink = `https://leilao.detran.mg.gov.br/lotes/detalhes/${vehicleId}`

  const handleAnalyzeClick = () => {
    setConfirmationOpen(false)
    setTimeout(() => {
      document.getElementById('vehicle-analysis-trigger')?.click()
    }, 150)
  }

  return (
    <Dialog open={isConfirmationOpen} onOpenChange={setConfirmationOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          id="tour-go-to-auction"
        >
          {auctionHammer} Dar lance
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            Tem certeza que deseja ir?
          </DialogTitle>
          <DialogDescription className="pt-2">
            Conifrme se este é o veículo certo. Recomendamos ver a análise e o
            histórico antes de dar seu lance no site oficial.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2 pt-4">
          <Button
            variant="secondary"
            onClick={handleAnalyzeClick}
            disabled={disabled}
          >
            <Sparkles className="mr-2 h-4 w-4" /> Ver Análise Completa
          </Button>
          <a href={vehicleLink} target="_blank" rel="noopener noreferrer">
            <Button className="w-full sm:w-auto" disabled={disabled}>
              <ExternalLink className="ml-2 h-4 w-4" /> Ir para o Detran
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
