import { motion } from 'framer-motion'

interface VehiclePriceDisplayProps {
  evaluationValue: string
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehiclePriceDisplay({
  evaluationValue,
}: VehiclePriceDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground">Valor de avaliação</p>
        <p className="text-3xl font-bold text-primary">
          R${' '}
          {parseFloat(evaluationValue).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
    </motion.div>
  )
}
