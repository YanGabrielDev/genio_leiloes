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
import { whatsappIcon } from '@/assets/icons'

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
      <DialogContent className="max-w-[480px] rounded-xl">
        <div className="p-6">
          <div className="flex items-center text-xl font-bold mb-4">
            <span className="mr-2">🔍</span>
            <h3>Consultoria Especializada para Este Veículo</h3>
          </div>

          <p className="text-gray-800 mb-5">
            Quer tomar a decisão certa antes de dar o lance? Conte com uma
            análise completa e personalizada deste veículo:
          </p>

          <ul className="space-y-3 mb-5">
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Transporte até sua cidade (cegonha ou guincho)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Datas e horários de visitação no pátio</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Avaliação de danos com Inteligência Artificial</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Estimativa do valor real (FIPE + contexto de leilão)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Histórico de sinistros, roubos e leilões</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span>Custos extras e riscos ocultos</span>
            </li>
          </ul>

          <div className="bg-blue-50 p-4 border-l-4 border-green-500 rounded-lg mb-5 text-gray-800">
            Essa consultoria é exclusiva para este veículo. Evite prejuízos,
            negocie com segurança e garanta uma ótima compra.
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
              Falar com um Especialista Agora
              {whatsappIcon}
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
