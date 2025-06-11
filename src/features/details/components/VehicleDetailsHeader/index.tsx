import { motion } from 'framer-motion'

interface VehicleDetailsHeaderProps {
  vehicleMarcaModelo: string
  leilaoNome: string
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehicleDetailsHeader({
  vehicleMarcaModelo,
  leilaoNome,
}: VehicleDetailsHeaderProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="flex items-center text-sm text-muted-foreground mb-6"
    >
      <span>Leilões</span>
      <span className="mx-2">/</span>
      <span>{leilaoNome}</span>
      <span className="mx-2">/</span>
      <span className="text-foreground font-medium">{vehicleMarcaModelo}</span>
    </motion.div>
  )
}
