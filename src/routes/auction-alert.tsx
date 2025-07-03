import { Template } from '@/components/Template'
import { createFileRoute } from '@tanstack/react-router'
import { AlertList } from '@/features/auction-alert/components/AlertList'
import { useAlertForm } from '@/features/auction-alert/hooks/use-alert-form'
import { useListAlerts } from '@/features/auction-alert/hooks/use-list-alerts'
import { useCreateAlert } from '@/features/auction-alert/hooks/use-create-alert'
import { AlertForm } from '@/features/auction-alert/components/AlertForm'

export const Route = createFileRoute('/auction-alert')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    formData,
    updateFormData,
    formatCurrency,
    prepareSubmitData,
    resetForm,
  } = useAlertForm()
  const { data: alerts = [], isLoading: isLoadingAlerts } = useListAlerts()
  const { mutate: createAlert, isPending: isCreating } = useCreateAlert()
  // const { mutate: deleteAlert } = useDeleteAlert();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = prepareSubmitData()
    createAlert(payload, {
      onSuccess: () => resetForm(),
    })
  }

  return (
    <Template toGo="/">
      <div className="space-y-8">
        <AlertForm
          formData={formData}
          onFormChange={updateFormData}
          onCurrencyBlur={formatCurrency}
          onSubmit={handleSubmit}
          isSubmitting={isCreating}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <AlertList
            alerts={alerts}
            onDelete={() => console.log('afas')}
            isLoading={isLoadingAlerts}
          />
        </div>
      </div>
    </Template>
  )
}
