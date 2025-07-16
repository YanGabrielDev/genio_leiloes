import { loaderIcon } from '@/assets/icons'
import { motion } from 'framer-motion'

interface VehiclePriceDisplayProps {
  evaluationValue: string
  loading: boolean
}

export function VehiclePriceDisplay({
  evaluationValue,
  loading,
}: VehiclePriceDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground">
          {loading ? 'Buscando último lance...' : 'Último lance realizado'}
        </p>

        {loading ? (
          <div className="flex items-center space-x-2 h-9">
            {loaderIcon}
            <span className="text-primary/50 text-lg">---</span>
          </div>
        ) : (
          <p className="text-3xl font-bold text-primary">
            R${' '}
            {parseFloat(evaluationValue).toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
            })}
          </p>
        )}
      </div>
    </motion.div>
  )
}
