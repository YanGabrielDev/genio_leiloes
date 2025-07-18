import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
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

  const hasReachedLimit =
    !!plan && plan.user_plan.requests_ai_used >= plan.user_plan.plan.requests_ai

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

    if (hasReachedLimit) {
      setShowUpgradeModal(true)
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
        <Button
          size="lg"
          className="w-full sm:w-auto"
          variant="primary"
          onClick={handleAnalysis}
          disabled={analysisIsPending || hasReachedLimit}
        >
          {analysisIsPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : hasReachedLimit ? (
            'Limite atingido'
          ) : (
            'Analisar com IA'
          )}
        </Button>
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
