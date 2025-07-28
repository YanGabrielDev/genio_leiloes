import { useState } from 'react'
import { Heart, Eye, Clock, TrendingUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { useNavigate } from '@tanstack/react-router'

// Definindo a interface para o veículo com as informações fornecidas

interface AuctionCardProps {
  vehicle: Vehicles
  onToggleFavorite: (id: number) => void // Ajustado para aceitar number
  currentVehicleLoading: boolean // Mantido para o indicador de loading
  isFavorite?: boolean
}

export function AuctionCard({
  vehicle,
  onToggleFavorite,
  currentVehicleLoading,
  isFavorite,
}: AuctionCardProps) {
  const navigate = useNavigate()
  // Função para formatar o tempo restante
  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m ${secs}s`
  }
  const handleClick = () => {
    navigate({
      to: '/details/$vehicleId',
      params: { vehicleId: vehicle.id.toString() },
    })
  }
  // Função para determinar a cor do badge de condição
  const getCondicaoColor = (condicao: 'Sucata' | 'Conservado') => {
    switch (condicao) {
      case 'Conservado':
        return 'bg-green-100 text-green-800'
      case 'Sucata':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Removendo o comentário da formatação para que funcione corretamente
  const formattedLastBid = parseFloat(
    vehicle?.avaliacao_atualizada || '0'
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
      {' '}
      {/* Adicionado as classes de grid aqui */}
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={vehicle?.imagens?.[0]} // Exibindo apenas a primeira imagem
              alt={`${vehicle?.marca_modelo}`}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105`}
            />
          </div>

          {/* Favorite Button (mantido para funcionalidade de exemplo) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => onToggleFavorite(vehicle?.id)}
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>

          {/* Condition Badge */}
          <Badge
            className={`absolute bottom-2 left-2 ${getCondicaoColor(vehicle?.condicao)}`}
          >
            {vehicle?.condicao}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title */}
            <div>
              <h3 className="font-semibold text-lg">{vehicle?.marca_modelo}</h3>
              <p className="text-sm text-gray-600">
                {vehicle?.ano} • {vehicle?.cor}
              </p>
            </div>

            {/* Price / Last Bid */}
            <div className="space-y-1">
              {currentVehicleLoading ? (
                <div className="flex items-center space-x-2">
                  {/* Aqui você pode colocar seu loaderIcon ou um spinner simples */}
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    Buscando último lance...
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Último lance:</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        {formattedLastBid}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Time and Info - Descomentado para exibir o tempo restante e o estado */}
            {/* <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTimeRemaining(vehicle?.tempo_restante)}</span>
              </div>
              <span>{vehicle?.leilao.estado}</span>
            </div> */}

            {/* Action Button */}
            <Button className="w-full" onClick={() => handleClick()}>
              <Eye className="w-4 h-4 mr-2" />
              Ver detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
