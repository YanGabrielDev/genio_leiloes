import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react' // Import Loader2
import { useAnalysis } from '../../hooks/useAnalysis'

interface VehicleAnalysisDialogProps {
  vehicleData: {
    ano: string | number
    avaliacao: string
    imagens: string[]
    marca_modelo: string
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

  const handleAnalysis = () => {
    postAnalysis({
      ano: String(vehicleData.ano),
      avaliacao: vehicleData.avaliacao,
      // Only send the first image as per original logic
      imagens: [vehicleData.imagens[0]],
      marca_modelo: vehicleData.marca_modelo,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          variant="primary"
          onClick={handleAnalysis}
          disabled={analysisIsPending} // Disable button while pending
        >
          {analysisIsPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Analisar com IA
        </Button>
      </DialogTrigger>
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
  )
}
