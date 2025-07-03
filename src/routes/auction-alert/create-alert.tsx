import { Template } from '@/components/Template'
import { CreateAlertPage } from '@/features/auction-alert/components/CreateAlertPage'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/auction-alert/create-alert')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Template>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <CreateAlertPage />
      </motion.div>
    </Template>
  )
}
