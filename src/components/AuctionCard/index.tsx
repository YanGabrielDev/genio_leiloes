import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface AuctionCardProps {
  type: string;
  name: string;
  avaliacao: string;
  imagens: string[];
  year: number;
  link: string;
}

export const AuctionCard = ({
  year,
  avaliacao,
  name,
  type,
  imagens,
  link,
}: AuctionCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {imagens?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${name} imagem ${index + 1}`}
                className="w-full h-auto object-cover rounded transform hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">{type}</span>
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
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="text-gray-600 mb-2"
              >
                Tipo: {type}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="text-gray-600 mb-2"
              >
                Ano: {year}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="text-gray-600 mb-2"
              >
                Avaliação: R$ {avaliacao}
              </motion.p>
              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.2 }}
                className="mb-4 text-blue-500 underline"
                target="_blank"
                href={link}
              >
                Lance atual{" "}
              </motion.a>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {imagens.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`${name} imagem ${index + 1}`}
                    className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
