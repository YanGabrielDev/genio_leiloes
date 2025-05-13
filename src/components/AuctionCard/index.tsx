import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

interface AuctionCardProps {
  type: string;
  name: string;
  avaliacao: string;
  imagens: string[];
  year: number;
}

export const AuctionCard = ({ year, avaliacao, name, type, imagens }: AuctionCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <Carousel className="w-full">
            <CarouselContent>
              {imagens?.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img}
                    alt={`${name} imagem ${index + 1}`}
                    className="w-full h-48 object-cover rounded transform hover:scale-105 transition-transform duration-200"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {imagens.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </>
            )}
          </Carousel>

          {/* <span className="text-xs text-gray-600 mt-4">{type}</span> */}
          <span className="text-slate-950 font-medium mb-2">{name}</span>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">Avaliação</span>
              <strong>R$ {avaliacao}</strong>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">Ano</span>
              <strong>{year}</strong>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {name}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Detalhes do veículo
              </DialogDescription>
            </DialogHeader>
            <div className="p-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {imagens.map((img, index) => (
                    <CarouselItem key={index}>
                      <motion.img
                        src={img}
                        alt={`${name} imagem ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.2 }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {imagens.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>

              <div className="mt-6 space-y-4">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-gray-600"
                >
                  Tipo: {type}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="text-gray-600"
                >
                  Ano: {year}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  className="text-gray-600"
                >
                  Avaliação: R$ {avaliacao}
                </motion.p>
              </div>
            </div>
            <DialogClose asChild>
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                ✕
              </button>
            </DialogClose>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};