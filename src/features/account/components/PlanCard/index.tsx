// src/features/account/components/PlanCard.tsx
import { motion } from 'framer-motion'
import { Check, Crown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Plan } from '../../services/subscriptions/subscriptions.types'

interface PlanCardProps {
  plan: Plan
  currentPlanName: string
}

export function PlanCard({ plan, currentPlanName }: PlanCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-lg p-4 relative ${
        plan.recommended ? 'border-2 border-yellow-400' : 'border-gray-200'
      } ${currentPlanName === plan.title ? 'bg-gray-50' : 'bg-white'}`}
    >
      {plan.recommended && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 mr-1" />
          Recomendado
        </div>
      )}
      {currentPlanName === plan.title && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Seu Plano
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{plan.title}</h3>
        {plan.title.includes('Profissional') && (
          <Crown className="h-5 w-5 text-yellow-500" />
        )}
      </div>
      <p className="text-sm text-gray-600 mb-3">{plan.description}</p>

      <div className="mb-4">
        <div className="flex items-end">
          <span className="text-2xl font-bold">R$ {plan.monthly_price}</span>
          <span className="text-sm text-gray-500 ml-1">/mês</span>
        </div>
        {plan.annual_price !== '0.00' && (
          <div className="text-sm text-gray-500">
            ou R$ {plan.annual_price} anual
          </div>
        )}
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">
          {plan.features_description}
        </h4>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={
          currentPlanName === plan.title
            ? 'outline'
            : plan.recommended
              ? 'default'
              : 'secondary'
        }
        size="sm"
        className="w-full"
        disabled={currentPlanName === plan.title}
        onClick={() =>
          navigate({
            to: '/payment',
            search: {
              stripe_monthly_price_id: plan.stripe_monthly_price_id,
            },
          })
        }
      >
        {currentPlanName === plan.title ? 'Plano Atual' : 'Assinar'}
      </Button>
    </motion.div>
  )
}
