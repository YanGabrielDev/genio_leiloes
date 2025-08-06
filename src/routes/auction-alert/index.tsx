import { Template } from '@/components/Template'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { AlertList } from '@/features/auction-alert/components/AlertList'
import { useListAlerts } from '@/features/auction-alert/hooks/use-list-alerts'
import { Button } from '@/components/ui/button'
import { Coins, Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteAlert } from '@/features/auction-alert/hooks/use-delete-alert '
import { useUserStore } from '@/store/user.store'
import { toast } from '@/hooks/use-toast'
import { useUpdateSubscriptionsPlans } from '@/features/account/hooks/use-update-subscriptions-plans'

export const Route = createFileRoute('/auction-alert/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: alerts = [], isLoading: isLoadingAlerts } = useListAlerts()
  const { mutate: deleteAlert } = useDeleteAlert()
  const { plan } = useUserStore()
  const { mutateAsync: updateSubscriptionsPlans } =
    useUpdateSubscriptionsPlans()
  const navigate = useNavigate()
  const goToCreateAlert = async () => {
    if ((plan?.saldo_moedas || 0) < 50) {
      toast({
        title: 'Moedas insuficientes',
        description: 'Você precisa de 50 moedas para criar um novo alerta',
        variant: 'destructive',
      })
      return
    }
    await updateSubscriptionsPlans()
    navigate({ to: '/auction-alert/create-alert' })
  }

  return (
    <Template toGo="/">
      {/* Header com título e botão de ação */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Meus Alertas
        </h1>
        <Button className="gap-2" onClick={goToCreateAlert} variant={'outline'}>
          <Plus className="h-4 w-4" />
          Criar Novo Alerta
          <span className="ml-2 flex items-center gap-1">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-bold">50</span>
          </span>
        </Button>
      </div>

      {/* Card da listagem */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header do card */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-700/50">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Alertas Ativos
          </h2>
        </div>

        {/* Listagem */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {isLoadingAlerts ? (
            <div className="p-6 space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : alerts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <Plus className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Nenhum alerta criado
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Comece criando um novo alerta de leilão.
              </p>
              <div className="mt-6">
                <Link to="/auction-alert/create-alert">
                  <Button>
                    <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
                    Novo Alerta
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <AlertList alerts={alerts} onDelete={deleteAlert} />
          )}
        </div>
      </div>
    </Template>
  )
}
