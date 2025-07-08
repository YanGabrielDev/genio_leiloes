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
}

export const AuctionCard = ({
  year,
  avaliacao,
  name,
  imagens,
  id,
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
          {/* {imagens.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-sm" />
            </>
          )} */}
        </Carousel>

        <div className="mt-4 space-y-3">
          <h3 className="text-lg font-bold text-gray-900 truncate">{name}</h3>

          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Último valor consultado
              </span>
              <p className="text-lg font-bold text-emerald-600">
                {' '}
                {parseFloat(avaliacao).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-xs font-medium text-gray-500 uppercase">
                Ano
              </span>
              <p className="text-lg font-semibold text-gray-900">{year}</p>
            </div>
          </div>

          {/* <div className="inline-flex bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              {type}
            </div> */}
        </div>
      </div>
      {/* </DialogTrigger> */}

      {/* <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold text-gray-900">
                {name}
              </DialogTitle>
              <DialogDescription className="text-gray-500 mt-1">
                Detalhes completos do veículo
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {imagens.map((img, index) => (
                    <CarouselItem key={index}>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-video overflow-hidden rounded-xl"
                      >
                        <img
                          src={img}
                          alt={`${name} imagem ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {imagens.length > 1 && (
                  <>
                    <CarouselPrevious className="bg-white/80 hover:bg-white" />
                    <CarouselNext className="bg-white/80 hover:bg-white" />
                  </>
                )}
              </Carousel>

              <div className="grid grid-cols-2 gap-6 mt-8 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Tipo</span>
                  <p className="text-lg font-semibold text-gray-900">{type}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-500">Ano</span>
                  <p className="text-lg font-semibold text-gray-900">{year}</p>
                </div>

                <div className="space-y-2 col-span-2">
                  <span className="text-sm font-medium text-gray-500">Avaliação</span>
                  <p className="text-2xl font-bold text-emerald-600">R$ {avaliacao}</p>
                </div>
              </div>
            </div> */}

      {/* <DialogClose asChild>
              <button className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </DialogClose> */}
      {/* </motion.div>
        </AnimatePresence>
      </DialogContent> */}
    </>
  )
}
