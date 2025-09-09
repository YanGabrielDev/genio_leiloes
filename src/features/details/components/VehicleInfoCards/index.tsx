import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'

interface VehicleInfoCardsProps {
  year: string | number
  color: string
  leilaoName: string
  leilaoState: string
  isLoadingLeilaoData: boolean
  leilaoData?: {
    arrematante: string
    statusLeilao: string
    valorIncremento: string
    valor: string
    tempo: number
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
  isLoadingLeilaoData,
}: VehicleInfoCardsProps) {
  // Função para formatar o tempo em segundos para minutos:segundos
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ano
                  </p>
                  <p className="text-base font-semibold">
                    {year || 'Não informado'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Cor
                  </p>
                  <p className="text-base font-semibold">
                    {color || 'Não informada'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Leilão
                  </p>
                  <p className="text-base font-semibold">{leilaoName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Localização
                  </p>
                  <p className="text-base font-semibold">
                    {leilaoState || 'Não informada'}
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="leilao">
              {isLoadingLeilaoData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Skeleton className="h-6 w-32 mb-3" />
                    <div className="space-y-3">
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                          <Skeleton className="h-6 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Valor Atual
                      </p>
                      <p className="text-xl font-bold text-primary">
                        R$ {leilaoData?.valor}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Incremento Mínimo
                      </p>
                      <p className="text-lg font-semibold">
                        R$ {leilaoData?.valorIncremento}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Tempo Restante
                      </p>
                      {leilaoData?.tempo && (
                        <p className="text-lg font-semibold">
                          {formatTime(leilaoData?.tempo)}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        Status
                      </p>
                      <p className="text-lg font-semibold">
                        {leilaoData?.statusLeilao === '1'
                          ? 'Ativo'
                          : 'Finalizado'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Últimos Lances
                    </h3>
                    <div className="space-y-3">
                      {leilaoData?.ultimosLances.map((lance, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">
                              {lance.pre_arrematante}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {lance.data_hora}
                            </p>
                          </div>
                          <p className="text-lg font-bold">R$ {lance.valor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
