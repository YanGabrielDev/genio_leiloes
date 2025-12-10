import { Skeleton } from '@/components/ui/skeleton'

import { LastBids } from './LastBids'
import { CountdownTimer } from '@/features/home/components/AuctionCard/CountdownTimer'

interface AuctionInformationProps {
  isLoading: boolean
  restTime: string
  isFinished: boolean
  data?: {
    statusLeilao: string
    valorIncremento: string
    ultimosLances: Array<{
      pre_arrematante: string
      valor: string
      data_hora: string
    }>
  }
}

const AuctionInfoSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(3)].map((_, i) => (
        <div className="space-y-1" key={i}>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
      ))}
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
)

export function AuctionInformation({
  isLoading,
  data,
  restTime,
  isFinished,
}: AuctionInformationProps) {
  if (isLoading) {
    return <AuctionInfoSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Incremento Mínimo
          </p>
          <p className="text-lg font-semibold">R$ {data?.valorIncremento}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">
            Tempo Restante
          </p>
          {restTime && (
            <CountdownTimer isFinished={isFinished} targetDate={restTime} />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <p className="text-lg font-semibold">
            {data?.statusLeilao === '1' ? 'Ativo' : 'Finalizado'}
          </p>
        </div>
      </div>
      {data?.ultimosLances && data.ultimosLances.length > 0 && (
        <LastBids bids={data.ultimosLances} />
      )}
    </div>
  )
}
