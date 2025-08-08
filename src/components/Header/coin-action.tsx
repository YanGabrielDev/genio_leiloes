import { Coins } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
      <div className="mt-6">
        <DialogTrigger>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ml-auto"
          >
            <Coins className="h-5 w-5 text-yellow-500" />
            <span className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {plan?.saldo_moedas || 0}
            </span>
          </motion.div>
        </DialogTrigger>
      </div>

      {/* Modal de confirmação */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nossos pacotes</DialogTitle>
        </DialogHeader>
        {plan && plan?.pacotes_disponiveis?.length !== 0 && (
          <PlansSection plans={plan} />
        )}
      </DialogContent>
    </Dialog>
  )
}
