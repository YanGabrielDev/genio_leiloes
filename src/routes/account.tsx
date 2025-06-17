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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const removeUser = async () => {
    try {
      await deleteUser()
      setIsDialogOpen(false)
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
          {subscriptionPlans?.available_plans && (
            <div className="mt-8">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                Planos Disponíveis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {subscriptionPlans?.available_plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5 }}
                    className={`border rounded-lg p-4 relative ${
                      plan.recommended
                        ? 'border-2 border-yellow-400'
                        : 'border-gray-200'
                    } ${
                      userProfile.current_plan.plan_name === plan.title
                        ? 'bg-gray-50'
                        : 'bg-white'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        Recomendado
                      </div>
                    )}
                    {userProfile.current_plan.plan_name === plan.title && (
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
                    <p className="text-sm text-gray-600 mb-3">
                      {plan.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex items-end">
                        <span className="text-2xl font-bold">
                          R$ {plan.monthly_price}
                        </span>
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
                        userProfile.current_plan.plan_name === plan.title
                          ? 'outline'
                          : plan.recommended
                            ? 'default'
                            : 'secondary'
                      }
                      size="sm"
                      className="w-full"
                      disabled={
                        userProfile.current_plan.plan_name === plan.title
                      }
                    >
                      {userProfile.current_plan.plan_name === plan.title
                        ? 'Plano Atual'
                        : 'Assinar'}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Botões responsivos */}
          <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-4">
            <Button variant="outline" size="sm" className="text-xs md:text-sm">
              Alterar Plano
            </Button>
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
        <div className="mt-6">
          <Button
            variant="destructive"
            size="sm"
            className="text-xs md:text-sm"
            onClick={() => setIsDialogOpen(true)}
          >
            Apagar Conta
          </Button>
        </div>

        {/* Modal de confirmação */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={removeUser}
                disabled={deleteUserIsPending}
              >
                Confirmar Exclusão
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </Template>
  )
}
