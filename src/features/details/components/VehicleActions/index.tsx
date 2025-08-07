import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { VehicleAnalysisDialog } from '../VehicleAnalysisDialog'
import { MessageCircleMore } from 'lucide-react' // Added MessageCircleMore icon
import { auctionHammer } from '@/assets/icons'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
      <VehicleAnalysisDialog vehicleData={vehicleData} />

      <a href={vehicleLink} target="_blank">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Ir para o leilão {auctionHammer}
        </Button>
      </a>

      {/* Consultancy Button with Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full sm:w-auto gap-2">
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
            <p>Quer tomar a decisão certa antes de dar o lance?</p>

            <p>
              Eu faço uma análise completa e personalizada deste veículo para
              você, incluindo:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                Pesquisa de preço de transporte (cegonha ou guincho) até sua
                cidade
              </li>
              <li>
                Datas e horários de visitação no pátio para análise presencial
              </li>
              <li>Avaliação de danos visuais com Inteligência Artificial</li>
              <li>
                Estimativa do valor de mercado real (tabela FIPE + contexto de
                leilão)
              </li>
              <li>
                Checagem de histórico de sinistros, roubo e leilões anteriores
              </li>
              <li>Orientação sobre custos extras e riscos ocultos</li>
            </ul>

            <p>
              Você não precisa decidir no escuro.
              <br />
              Clique abaixo e fale comigo no WhatsApp.
              <br />
              Essa consultoria é exclusiva para este veículo e pode evitar um
              prejuízo ou garantir uma ótima compra.
            </p>

            <div className="pt-4">
              <a
                href="https://wa.me/553183165687"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  🟢 Falar com um Especialista Agora
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
