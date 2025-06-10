import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface PlanBadgeProps {
  plan: {
    plan_name: string
    is_active: boolean
  }
}

export const PlanBadge = ({ plan }: PlanBadgeProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Badge
        variant={plan.is_active ? 'default' : 'secondary'}
        className={`text-sm font-medium ${
          plan.is_active
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 hover:bg-gray-500'
        }`}
      >
        {plan.plan_name}
      </Badge>
    </motion.div>
  )
}
