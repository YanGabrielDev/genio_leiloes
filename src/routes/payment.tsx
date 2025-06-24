import { Template } from '@/components/Template'
import { PaymentForm } from '@/features/payment/components/PaymentForm'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Template toGo="/">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <PaymentForm />
      </motion.div>
    </Template>
  )
}
