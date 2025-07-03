import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert as AlertComponent } from '@/components/ui/alert'
import { Alert } from '../../services/alert'

interface AlertListProps {
  alerts: Alert[]
  onDelete: (id: number) => void
  isLoading?: boolean
  error?: Error | null
}

export const AlertList = ({
  alerts,
  onDelete,
  isLoading,
  error,
}: AlertListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <AlertComponent variant="destructive">
        Falha ao carregar alertas: {error.message}
      </AlertComponent>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum alerta criado ainda.
      </div>
    )
  }

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
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {alert.alerta_global
                    ? 'Todos veículos'
                    : 'Veículo específico'}{' '}
                  | {alert.enviar_uma_vez ? 'Enviar uma vez' : 'Enviar sempre'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Criado em:{' '}
                  {format(new Date(alert.criado_em), 'PPpp', { locale: ptBR })}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(alert.id)}
                disabled={isLoading}
              >
                Excluir
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
