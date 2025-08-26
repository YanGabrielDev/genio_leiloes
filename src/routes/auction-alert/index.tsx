import { Template } from '@/components/Template'
import { createFileRoute } from '@tanstack/react-router'
import { AlertList } from '@/features/auction-alert/components/AlertList'
import { useListAlerts } from '@/features/auction-alert/hooks/use-list-alerts'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { useDeleteAlert } from '@/features/auction-alert/hooks/use-delete-alert '

export const Route = createFileRoute('/auction-alert/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: alerts = [], isLoading: isLoadingAlerts } = useListAlerts()
  const { mutate: deleteAlert } = useDeleteAlert()

  return (
    <Template toGo="/">
      {/* Header com título e botão de ação */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Meus Alertas
          </h1>
          <Link to="/auction-alert/create-alert">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Novo Alerta
            </Button>
          </Link>
        </div>
        <h2 className="text-sx font-normal text-gray-600 dark:text-white">
          Configure alertas personalizados e seja o primeiro a saber quando o
          carro dos seus sonhos aparecer em leilão.
        </h2>
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
