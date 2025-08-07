'use client'

import { MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ConsultancyDialog({
  vehicleData,
}: {
  vehicleData?: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
    vehicleId: number
    is_favorite?: boolean
  }
}) {
  const defaultMessage = `Olá, gostaria de solicitar uma consultoria especializada para o veículo:
  
*Detalhes do Veículo:*
- Modelo: ${vehicleData?.marca_modelo || 'Não especificado'}
- Ano: ${vehicleData?.ano || 'Não especificado'}
- Lote: ${vehicleData?.lote_id || 'Não especificado'}

Por favor, me envie mais informações sobre a consultoria. Obrigado!`

  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/553183165687?text=${encodedMessage}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="w-full sm:w-auto gap-2">
          <MessageCircleMore className="w-4 h-4" />
          Solicitar consultoria
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">
            🔍 Consultoria Especializada para Este Veículo
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="pt-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                🟢 Falar com um Especialista Agora
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
