import { Template } from '@/components/Template'
import { PaymentForm } from '@/features/payment/components/PaymentForm'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/account/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  const { stripe_monthly_price_id } = Route.useSearch<any>()

  return (
    <Template toGo="/account">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <PaymentForm stripePriceId={stripe_monthly_price_id} />
      </motion.div>
    </Template>
  )
}
