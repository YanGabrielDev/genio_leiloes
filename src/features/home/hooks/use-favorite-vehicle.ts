import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import auctionService from '../services/auction/auction.service'

export const useFavoriteVehicle = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (veiculoId: number) =>
      auctionService.favoriteVehicle(veiculoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-favorite'] })
      toast({
        title: 'Sucesso!',
        description: 'Veículo favoritado com sucesso.',
        variant: 'success',
      })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao favoritar o veículo',
        description: 'Não foi possível favoritar o veículo. Tente novamente.',
        variant: 'destructive',
      })
    },
  })
}
