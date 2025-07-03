import { AlertForm } from '@/features/auction-alert/components/AlertForm'
import { useCreateAlert } from '@/features/auction-alert/hooks/use-create-alert'
import { AlertFormValues } from '@/features/auction-alert/schemas/alert-form.schema'
import { parseCurrencyToNumber } from '@/features/auction-alert/utils/currency.utils'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function CreateAlertPage() {
  const { mutateAsync: createAlert, isPending: isCreating } = useCreateAlert()
  const navigate = useNavigate()
  const handleSubmit = async (formData: AlertFormValues) => {
    try {
      const payload = {
        ...formData,
        valor_referencia: parseCurrencyToNumber(formData.valor_referencia),
        ano_de: parseInt(formData.ano_de) || 0,
        ano_ate: parseInt(formData.ano_ate) || 0,
      }
      await createAlert(payload)
      navigate({ to: '/auction-alert' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link to="/auction-alert">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Criar Alerta Personalizado
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <AlertForm onSubmit={handleSubmit} isSubmitting={isCreating} />
      </div>
    </div>
  )
}
