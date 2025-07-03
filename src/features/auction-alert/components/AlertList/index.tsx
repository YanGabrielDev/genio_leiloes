import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Alert } from '../../services/alert'
import { UseMutateFunction } from '@tanstack/react-query'

interface AlertListProps {
  alerts: Alert[]
  onDelete: UseMutateFunction<void, Error, number, unknown>
  isLoading?: boolean
}

export const AlertList = ({ alerts, onDelete, isLoading }: AlertListProps) => {
  const [deletingIds, setDeletingIds] = useState<number[]>([])

  const handleDelete = async (id: number) => {
    setDeletingIds((prev) => [...prev, id])
    try {
      await onDelete(id)
    } finally {
      setDeletingIds((prev) => prev.filter((item) => item !== id))
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum alerta criado ainda.
      </div>
    )
  }
  console.log({ deletingIds })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Meus Alertas
      </h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {alerts.map((alert) => (
          <div key={alert.id} className="py-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {alert.marca_modelo} ({alert.ano_de}-{alert.ano_ate})
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Alerta quando valor {formatCondition(alert.momento_alerta)}{' '}
                  {alert.valor_referencia}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cor: {alert.cor} | Contato: {alert.contato}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Criado em:{' '}
                  {format(new Date(alert.criado_em), 'PPpp', { locale: ptBR })}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(alert.id)}
                disabled={deletingIds.includes(alert.id)}
              >
                {deletingIds.includes(alert.id) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  'Excluir'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const formatCondition = (condition: string) => {
  switch (condition) {
    case 'antes':
      return 'for menor que'
    case 'exato':
      return 'for igual a'
    case 'depois':
      return 'for maior que'
    default:
      return condition
  }
}
