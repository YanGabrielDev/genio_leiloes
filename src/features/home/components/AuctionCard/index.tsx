import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../../../components/ui/carousel'
import { useNavigate } from '@tanstack/react-router'

interface AuctionCardProps {
  type: string
  name: string
  avaliacao: string
  imagens: string[]
  year: number
  id: number
  currentVehicleLoading: boolean
}

export const AuctionCard = ({
  year,
  avaliacao,
  name,
  imagens,
  id,
  currentVehicleLoading,
}: AuctionCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({
      to: '/details/$vehicleId',
      params: { vehicleId: id.toString() },
    })
  }
  return (
    <>
      {/* <DialogTrigger asChild> */}
      <div
        onClick={handleClick}
        className="group bg-white rounded-xl border border-gray-200 p-4 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <Carousel className="w-full relative overflow-hidden rounded-lg">
          <CarouselContent>
            {imagens?.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={img}
                    alt={`${name} imagem ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-4 space-y-3">
          <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              {currentVehicleLoading ? (
                <div className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    Buscando último lance...
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    Último lance realizado
                  </span>
                  <p className="text-lg font-bold text-emerald-600">
                    {' '}
                    {parseFloat(avaliacao).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </>
              )}
            </div>

            <div className="space-y-1 text-right">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Ano
              </span>
              <p className="text-lg font-semibold text-gray-900">{year}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
