// src/features/account/components/PlansSection.tsx
import { PackageCard } from '../PackageCard'
import { ListSubscriptionsPlans } from '../../services/subscriptions/subscriptions.types'

interface PlansSectionProps {
  plans: ListSubscriptionsPlans
}

export function PlansSection({ plans }: PlansSectionProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Planos Disponíveis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.pacotes_disponiveis.map((plan, index) => (
          <PackageCard key={plan.id} pack={plan} recommended={index === 2} />
        ))}
      </div>
    </div>
  )
}
