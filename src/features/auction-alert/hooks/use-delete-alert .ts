import { useMutation, useQueryClient } from '@tanstack/react-query'
import alertService from '../services/alert/alert.service'
import { useToast } from '@/hooks/use-toast'

/**
 * Hook para deletar um alerta existente.
 * Invalida a lista de alertas após o sucesso.
 * @returns {object} Objeto com a função `mutate` para deletar o alerta, status de carregamento e erro.
 */
export const useDeleteAlert = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation<void, Error, number>({
    mutationFn: (id) => alertService.deleteAlert({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
      toast({
        title: 'Sucesso!',
        description: 'Alerta deletado com sucesso.',
        variant: 'success',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao deletar alerta',
        description:
          error.message ||
          'Não foi possível deletar o alerta. Tente novamente.',
        variant: 'destructive',
      })
    },
  })
}
