import { useMutation } from '@tanstack/react-query'
import { toast } from '@/hooks/use-toast'
import { useUserStore } from '@/store/user.store'
import { api } from '@/lib/api'

export const useFavoriteVehicle = () => {
  const { userProfile } = useUserStore()

  const favoriteVehicleMutation = useMutation({
    mutationFn: async (vehicleId: number) => {
      if (!userProfile) {
        throw new Error('Usuário não autenticado')
      }

      const response = await api.post(`/vehicles/${vehicleId}/favorite`)
      return response.data
    },
    onError: (error) => {
      if (error.message === 'Usuário não autenticado') {
        toast({
          description: 'Faça login para favoritar veículos',
          variant: 'info',
        })
      } else {
        toast({
          description: 'Ocorreu um erro ao favoritar o veículo',
          variant: 'destructive',
        })
      }
    },
  })

  return {
    mutate: favoriteVehicleMutation.mutate,
    isPending: favoriteVehicleMutation.isPending,
  }
}
