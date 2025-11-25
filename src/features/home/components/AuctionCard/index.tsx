import { Heart, Eye, TrendingUp, Gavel, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { useNavigate } from '@tanstack/react-router'
import { CountdownTimer } from './CountdownTimer'

interface AuctionCardProps {
  vehicle: Vehicles
  onToggleFavorite: (id: number) => void
  currentVehicleLoading: boolean
  isFavorite?: boolean
  id?: string | undefined
}

export function AuctionCard({
  vehicle,
  onToggleFavorite,
  currentVehicleLoading,
  isFavorite,
  id,
}: AuctionCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: '/details/$vehicleId',
      params: { vehicleId: vehicle.id.toString() },
    })
  }

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

  const formattedLastBid = parseFloat(
    vehicle?.avaliacao_atualizada || '0'
  ).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
  const isFinished = vehicle.encerrado
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4" id={id}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100">
            <img
              src={vehicle?.imagens?.[0]}
              alt={`${vehicle?.marca_modelo}`}
              className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105`}
            />
          </div>
          {vehicle.encerrado && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
              <Badge variant="destructive" className="text-sm gap-2">
                <Gavel className="h-4 w-4" />
                Encerrado
              </Badge>
            </div>
          )}

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

          <Badge
            className={`absolute top-3 left-2 ${getCondicaoColor(vehicle?.condicao)}`}
          >
            {vehicle?.condicao}
          </Badge>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="min-h-20">
              <h3 className="font-semibold text-lg">{vehicle?.marca_modelo}</h3>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  {vehicle?.ano} • {vehicle?.cor}
                </p>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <p className="text-sm text-gray-600">
                    {vehicle?.leilao.cidade}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {currentVehicleLoading ? (
                <div className="flex items-center space-x-2">
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
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tempo restante:</span>
              <CountdownTimer
                isFinished={isFinished}
                targetDate={vehicle.tempo_restante}
              />
            </div>

            <Button
              className="w-full"
              onClick={() => handleClick()}
              id="tour-ver-detalhes"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver detalhes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
