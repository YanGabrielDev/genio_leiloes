// features/auction-alert/hooks/useDeleteAlert.ts
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import alertService from '../services/alert/alert.service'

export const useDeleteAlert = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: (id: number) => alertService.deleteAlert({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] })
      toast({
        title: 'Sucesso!',
        description: 'Alerta excluído com sucesso.',
        variant: 'success',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir alerta',
        description: 'Não foi possível excluir o alerta. Tente novamente.',
        variant: 'destructive',
      })
      throw error
    },
  })
}
