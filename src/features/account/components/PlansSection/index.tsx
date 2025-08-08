import { PackageCard } from '../PackageCard'
import { ListSubscriptionsPlans } from '../../services/subscriptions/subscriptions.types'

interface PlansSectionProps {
  plans: ListSubscriptionsPlans
}

export function PlansSection({ plans }: PlansSectionProps) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
        {plans.pacotes_disponiveis.map((plan, index) => (
          <PackageCard
            key={plan.id}
            pack={plan}
            recommended={index === 2}
            className={
              index === plans.pacotes_disponiveis.length - 1
                ? 'xl:col-start-2'
                : ''
            }
          />
        ))}
      </div>
    </div>
  )
}
