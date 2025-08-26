import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Sparkles, Coins } from 'lucide-react'
import { useAnalysis } from '../../hooks/use-analysis'
import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@/hooks/use-toast'
import { useEffect, useState } from 'react'
import { UpgradePlanModal } from '../UpgradePlanModal'
import { useListSubscriptionsPlans } from '@/features/account/hooks/use-list-subscriptions-plans'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

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
  const { userProfile, plan, setUserPlan } = useUserStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const { data: subscriptionPlans, isLoading: isLoadingSubscriptionPlans } =
    useListSubscriptionsPlans()

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

    if ((plan?.saldo_moedas || 0) < 10) {
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

  useEffect(() => {
    if (subscriptionPlans) setUserPlan(subscriptionPlans)
  }, [isLoadingSubscriptionPlans, subscriptionPlans])

  return (
    <>
      {/* Botão com animação pulsante */}
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          size="lg"
          className="w-full ml-auto flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          variant="outline"
          onClick={handleAnalysis}
          disabled={analysisIsPending}
        >
          {analysisIsPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <motion.span
                animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="h-4 w-4 text-purple-500" />
              </motion.span>
              Avaliação inteligente
              <span className="ml-2 flex items-center gap-1">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold">10</span>
              </span>
            </>
          )}
        </Button>
      </motion.div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={analysisIsPending ? 'loading' : 'result'}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {analysisIsPending ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <span className="text-lg font-medium text-gray-600 animate-pulse">
                    Realizando análise com IA...
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-gray-700 text-sm leading-relaxed space-y-4"
                >
                  {analysis ? (
                    <MarkdownRenderer content={analysis} />
                  ) : (
                    'Nenhuma análise disponível.'
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Modal de upgrade */}
      <UpgradePlanModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
      />
    </>
  )
}
