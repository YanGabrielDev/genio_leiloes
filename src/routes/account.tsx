import { createFileRoute, useNavigate } from '@tanstack/react-router'
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
  DialogTrigger,
} from '@/components/ui/dialog'
import { useListSubscriptionsPlans } from '@/features/account/hooks/use-list-subscriptions-plans'
import { PlansSection } from '@/features/account/components/PlansSection'

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
  const navigate = useNavigate()
  const removeUser = async () => {
    try {
      await deleteUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Template toGo="/">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Minha Conta
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
              Gerencie suas informações e plano de assinatura
            </p>
          </div>
          <PlanBadge plan={userProfile.current_plan} />
        </div>

        {/* Grid de cards otimizado para mobile */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4">
          <AccountCard
            title="Nome"
            value={userProfile.name}
            icon={<User className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />}
          />
          <AccountCard
            title="Email"
            value={userProfile.email}
            icon={<Mail className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />}
          />
          <AccountCard
            title="Criação"
            value={new Date(userProfile.created_at).toLocaleDateString('pt-BR')}
            icon={<Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />}
          />
          <AccountCard
            title="Verificação"
            value={userProfile.email_verified ? 'Verificado' : 'Não verificado'}
            icon={
              <ShieldCheck
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  userProfile.email_verified
                    ? 'text-green-500'
                    : 'text-yellow-500'
                }`}
              />
            }
          />
        </div>

        {/* Seção de detalhes do plano atual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm md:shadow p-4 md:p-6"
        >
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
            Detalhes do Plano Atual
          </h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm md:text-base text-gray-600">
                Plano Atual
              </span>
              <span className="text-sm md:text-base font-medium">
                {userProfile.current_plan.plan_name}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm md:text-base text-gray-600">Status</span>
              <span className="text-sm md:text-base font-medium">
                {userProfile.current_plan.is_active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-sm md:text-base text-gray-600">
                Data de Início
              </span>
              <span className="text-sm md:text-base font-medium">
                {new Date(
                  userProfile.current_plan.start_date
                ).toLocaleDateString('pt-BR')}
              </span>
            </div>
            {userProfile.current_plan.end_date && (
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm md:text-base text-gray-600">
                  Data de Término
                </span>
                <span className="text-sm md:text-base font-medium">
                  {new Date(
                    userProfile.current_plan.end_date
                  ).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>

          {/* Seção de planos disponíveis */}
          {/* {subscriptionPlans?.available_plans && (
            <PlansSection
              plans={subscriptionPlans}
              currentPlanName={userProfile.current_plan.plan_name}
            />
          )} */}

          {/* Botões responsivos */}
          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-4">
            <Button variant="outline" size="sm" className="text-xs md:text-sm">
              Atualizar Dados
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs md:text-sm"
            >
              Cancelar Assinatura
            </Button>
          </div>
        </motion.div>

        {/* Botão para apagar conta */}
        {/* <Dialog>
          <div className="mt-6">
            <DialogTrigger>
              <Button
                variant="destructive"
                size="sm"
                className="text-xs md:text-sm"
                // onClick={() => setIsDialogOpen(true)}
              >
                Apagar Conta
              </Button>
            </DialogTrigger>
          </div> */}

        {/* Modal de confirmação */}
        {/* <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Tem certeza que deseja apagar sua conta?
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">
              Essa ação é <strong>irreversível</strong> e todos os seus dados
              serão perdidos.
            </p>
            <DialogFooter className="mt-4">
              <DialogTrigger>
                <Button variant="outline">Cancelar</Button>
              </DialogTrigger>

              <Button
                variant="destructive"
                onClick={removeUser}
                disabled={deleteUserIsPending}
              >
                Confirmar Exclusão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </motion.div>
    </Template>
  )
}
