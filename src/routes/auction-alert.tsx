import { Template } from '@/components/Template'
import { createFileRoute } from '@tanstack/react-router'
import { AlertList } from '@/features/auction-alert/components/AlertList'
import { useListAlerts } from '@/features/auction-alert/hooks/use-list-alerts'
import { useCreateAlert } from '@/features/auction-alert/hooks/use-create-alert'
import { useDeleteAlert } from '@/features/auction-alert/hooks/use-delete-alert '
import { AlertFormValues } from '@/features/auction-alert/schemas/alert-form.schema'
import { parseCurrencyToNumber } from '@/features/auction-alert/utils/currency.utils'
import { AlertForm } from '@/features/auction-alert/components/AlertForm'

export const Route = createFileRoute('/auction-alert')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: alerts = [], isLoading: isLoadingAlerts } = useListAlerts()
  const { mutate: createAlert, isPending: isCreating } = useCreateAlert()
  const { mutate: deleteAlert } = useDeleteAlert()

  const handleSubmit = (formData: AlertFormValues) => {
    const payload = {
      ...formData,
      valor_referencia: parseCurrencyToNumber(formData.valor_referencia),
      ano_de: parseInt(formData.ano_de) || 0,
      ano_ate: parseInt(formData.ano_ate) || 0,
    }
    createAlert(payload)
  }
  return (
    <Template toGo="/">
      <div className="space-y-8">
        <AlertForm onSubmit={handleSubmit} isSubmitting={isCreating} />

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <AlertList
            alerts={alerts}
            onDelete={deleteAlert}
            isLoading={isLoadingAlerts}
          />
        </div>
      </div>
    </Template>
  )
}
