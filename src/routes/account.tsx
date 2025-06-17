import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
  Mail,
  User,
  Calendar,
  ShieldCheck,
  Check,
  Crown,
  Star,
} from 'lucide-react'
import { AccountCard } from '@/features/account/components/AccountCard'
import { PlanBadge } from '@/features/account/components/PlanBadge'
import { useUserProfile } from '@/context/user-profile.context'
import { Template } from '@/components/Template'
import { useDeleteUser } from '@/features/auth/hooks/use-delete-user'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { useListSubscriptionsPlans } from '@/features/account/hooks/use-list-subscriptions-plans'

export const Route = createFileRoute('/account')({
  component: MyAccount,
})

function MyAccount() {
  const { userProfile } = useUserProfile()
  const { mutateAsync: deleteUser, isPending: deleteUserIsPending } =
    useDeleteUser()
  const { data: subscriptionPlans } = useListSubscriptionsPlans()
  if (!userProfile) {
    return <div>Erro ao carregar dados da conta</div>
  }
  // const [isDialogOpen, setIsDialogOpen] = useState(false)

  // const removeUser = async () => {
  //   try {
  //     await deleteUser()
  //     setIsDialogOpen(false)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <Template toGo="/">
      <span>asfas</span>
    </Template>
  )
}
