import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert, CreateAlertPayload } from '../services/alert'
import alertService from '../services/alert/alert.service'

/**
 * Hook para criar um novo alerta.
 * Invalida a lista de alertas após o sucesso.
 * @returns {object} Objeto com a função `mutate` para criar o alerta, status de carregamento e erro.
 */
export const useCreateAlert = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation<Alert, Error, CreateAlertPayload>({
    mutationFn: alertService.createAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })

      toast({
        title: 'Sucesso!',
        description: 'Alerta criado com sucesso.',
        variant: 'success', // Certifique-se de que seu tema Shadcn UI tem essa variante ou use "default"
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar alerta',
        description:
          error.message || 'Não foi possível criar o alerta. Tente novamente.',
        variant: 'destructive',
      })
    },
  })
}
