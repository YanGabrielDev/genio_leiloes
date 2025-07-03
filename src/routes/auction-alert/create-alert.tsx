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
      <CreateAlertPage />
    </Template>
  )
}
