// src/features/account/components/PlansSection.tsx
import { PlanCard } from '../PlanCard'
import { ListSubscriptionsPlans } from '../../services/subscriptions/subscriptions.types'

interface PlansSectionProps {
  plans: ListSubscriptionsPlans
  currentPlanName: string
}

export function PlansSection({ plans, currentPlanName }: PlansSectionProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Planos Disponíveis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.available_plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanName={currentPlanName}
          />
        ))}
      </div>
    </div>
  )
}
