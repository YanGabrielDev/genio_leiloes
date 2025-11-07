import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import { motion } from 'framer-motion'

interface AnalysesButtonProps {
  onClick: () => void
}

export const AnalysesButton = ({ onClick }: AnalysesButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        aria-label="Minhas Análises"
      >
        <History className="h-5 w-5 text-gray-400 group-hover:text-primary" />
      </Button>
    </motion.div>
  )
}
