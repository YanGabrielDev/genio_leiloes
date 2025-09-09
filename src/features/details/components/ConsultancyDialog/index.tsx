'use client'

import { Coins, MessageCircleMore } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { whatsappIcon } from '@/assets/icons'
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { useDecreaseCoins } from '@/hooks/use-decrease-coins'

export function ConsultancyDialog({
  vehicleData,
  ...props
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
  [key: string]: any
}) {
  const { userProfile, plan } = useUserStore()
  const navigate = useNavigate()
  const { mutate: decreaseCoins } = useDecreaseCoins()
  const coins = plan?.saldo_moedas ?? 0
  const defaultMessage = `Olá, gostaria de solicitar uma consultoria especializada para o veículo:

*Detalhes do Veículo:*
- Modelo: ${vehicleData?.marca_modelo || 'Não especificado'}
- Ano: ${vehicleData?.ano || 'Não especificado'}
- Lote: ${vehicleData?.lote_id || 'Não especificado'}

Por favor, me envie mais informações sobre a consultoria. Obrigado!`

  const encodedMessage = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/553183165687?text=${encodedMessage}`

  const handleConsultancy = () => {
    if (!userProfile && !plan) {
      toast({
        description:
          'Acesse a sua conta para usar a consultoria especializada.',
        variant: 'info',
      })
      setTimeout(() => navigate({ to: '/login' }), 2000)
      return
    }
    if (coins < 50) {
      toast({
        title: 'Moedas insuficientes',
        description: 'Você precisa de 50 moedas para usar esta análise.',
        variant: 'destructive',
      })
      return
    }
    if (coins >= 50) {
      decreaseCoins({ value: 50, descricao: 'Consultoria' })
      window.open(whatsappUrl, '_blank')
    }
  }
  console.log(plan, userProfile)

  return (
    <Dialog>
      <DialogTrigger asChild {...props}>
        <Button variant="secondary" className="w-full sm:w-auto gap-2">
          <MessageCircleMore className="h-4 w-4" />
          Falar com consultor
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] max-w-[480px] rounded-xl overflow-auto max-h-[90vh]">
        <DialogHeader className="p-4 md:p-6 pb-0">
          <DialogTitle className="flex items-center text-xl font-bold">
            <span className="mr-2 text-4xl">🔍</span>
            <h3>Consultoria Especializada para Este Veículo</h3>
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 md:p-6 pt-0">
          <p className="text-sm text-gray-700 mb-5">
            Quer tomar a decisão certa antes de dar o lance? Conte com uma
            análise completa e personalizada deste veículo:
          </p>

          <ul className="space-y-3 mb-5 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Transporte até sua cidade (cegonha ou guincho)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Datas e horários de visitação no pátio</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Avaliação de danos com Inteligência Artificial</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Estimativa do valor real (FIPE + contexto de leilão)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Histórico de sinistros, roubos e leilões</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 text-green-500">✅</span>
              <span>Custos extras e riscos ocultos</span>
            </li>
          </ul>

          <div className="bg-blue-50 p-4 border-l-4 border-green-500 rounded-lg mb-5 text-sm text-gray-800">
            Essa consultoria é exclusiva para este veículo. Evite prejuízos,
            negocie com segurança e garanta uma ótima compra.
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button onClick={handleConsultancy} className="w-full  ">
              Falar com um consultor agora{' '}
              <span className="ml-2 flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold">50</span>
              </span>
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
