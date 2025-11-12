import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VehicleSpecifications } from './VehicleSpecifications'
import { AuctionInformation } from './AuctionInformation'

interface VehicleInfoCardsProps {
  year: string | number
  color: string
  leilaoName: string
  leilaoState: string
  restTime: string
  isLoadingLeilaoData: boolean
  leilaoData?: {
    arrematante: string
    statusLeilao: string
    valorIncremento: string
    valor: string
    tempo_restante: string
    ultimosLances: Array<{
      pre_arrematante: string
      valor: string
      data_hora: string
    }>
  }
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehicleInfoCards({
  year,
  color,
  leilaoName,
  leilaoState,
  leilaoData,
  restTime,
  isLoadingLeilaoData,
}: VehicleInfoCardsProps) {
  return (
    <motion.div variants={fadeIn}>
      <Card className="rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
        <Tabs defaultValue="especificacoes">
          <CardHeader className="pb-0 border-b-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="especificacoes"
                className="text-xs md:text-sm"
              >
                Especificações
              </TabsTrigger>
              <TabsTrigger value="leilao" className="text-xs md:text-sm">
                Informações do Leilão
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            <TabsContent value="especificacoes">
              <VehicleSpecifications
                year={year}
                color={color}
                leilaoName={leilaoName}
                leilaoState={leilaoState}
              />
            </TabsContent>
            <TabsContent value="leilao">
              <AuctionInformation
                isLoading={isLoadingLeilaoData}
                data={leilaoData}
                restTime={restTime}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
