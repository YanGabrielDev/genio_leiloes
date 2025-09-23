import { Coins } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { motion } from 'framer-motion'
import { useUserStore } from '@/store/user.store'
import { PlansSection } from '@/features/account/components/PlansSection'

export const CoinAction = () => {
  const { plan } = useUserStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="tour-coins"
          className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-auto cursor-pointer"
        >
          <Coins className="h-5 w-5 text-yellow-500" />
          <span className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {plan?.saldo_moedas || 0} moedas
          </span>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl rounded-lg h-[90vh] max-h-[800px] flex flex-col">
        <DialogHeader className="px-1">
          <DialogTitle className="text-2xl font-bold text-center">
            Escolha o Melhor Pacote para Você
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 px-2 py-1 -mx-2">
          {plan && plan?.pacotes_disponiveis?.length !== 0 && (
            <PlansSection plans={plan} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
