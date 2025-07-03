import { useToast } from '@/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import { Alert } from '../services/alert/alert.types'
import alertService from '../services/alert/alert.service'

/**
 * Hook para listar todos os alertas do usuário.
 * @returns {object} Objeto com dados, status de carregamento e erro.
 */
export const useListAlerts = () => {
  const { toast } = useToast()

  return useQuery<Alert[], Error>({
    queryKey: ['alerts'],
    queryFn: async () => {
      try {
        return await alertService.listAlerts()
      } catch (error) {
        toast({
          title: 'Erro ao carregar alertas',
          description: 'Não foi possível buscar os alertas.',
          variant: 'destructive',
        })
        throw error // Re-throw para o React Query lidar
      }
    },
  })
}
