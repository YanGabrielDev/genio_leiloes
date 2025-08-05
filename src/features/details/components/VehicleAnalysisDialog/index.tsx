import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Sparkles, Coins } from 'lucide-react' // Adicionei o ícone Coins
import { useAnalysis } from '../../hooks/useAnalysis'
import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'
import { UpgradePlanModal } from '../UpgradePlanModal'

interface VehicleAnalysisDialogProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
    lote_id: number
  }
}

export function VehicleAnalysisDialog({
  vehicleData,
}: VehicleAnalysisDialogProps) {
  const {
    mutateAsync: postAnalysis,
    data: analysis,
    isPending: analysisIsPending,
  } = useAnalysis()
  const navigate = useNavigate()
  const { userProfile, plan } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleAnalysis = () => {
    if (!userProfile) {
      toast({
        description: 'Acesse a sua conta para usar o Analisar com IA.',
        variant: 'info',
      })
      setTimeout(() => {
        navigate({ to: '/login' })
      }, 2000)
      return
    }

    if ((plan?.saldo_moedas || 0) < 30) {
      toast({
        title: 'Moedas insuficientes',
        description: 'Você precisa de 30 moedas para usar esta análise',
        variant: 'destructive',
      })
      return
    }

    setIsModalOpen(true)
    postAnalysis({
      ano: String(vehicleData.ano),
      avaliacao: vehicleData.avaliacao,
      imagens: [vehicleData.imagens[0]],
      marca_modelo: vehicleData.marca_modelo,
      lote_id: vehicleData.lote_id,
    })
  }

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 0 0 rgba(124, 58, 237, 0)',
              '0 0 0 3px rgba(124, 58, 237, 0.3)',
              '0 0 0 0 rgba(124, 58, 237, 0)',
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          className="inline-block"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={handleAnalysis}
            disabled={analysisIsPending}
          >
            {/* Efeito de brilho animado */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {analysisIsPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                  }}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                </motion.span>{' '}
                Analisar com IA
                <span className="ml-2 flex items-center gap-1">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-bold">30</span>
                </span>
              </>
            )}
          </Button>
        </motion.div>

        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl max-h-96 overflow-auto">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {analysisIsPending ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
                  <span className="text-lg font-medium text-muted-foreground">
                    Realizando análise...
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {analysis || 'Nenhuma análise disponível.'}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <UpgradePlanModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
      />
    </>
  )
}
