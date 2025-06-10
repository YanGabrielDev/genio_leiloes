import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, User, Calendar, ShieldCheck } from 'lucide-react'
import { AccountCard } from '@/features/MyAccount/components/AccountCard'
import { PlanBadge } from '@/features/MyAccount/components/PlanBadge'
import { useUserProfile } from '@/context/user-profile.context'
import { Template } from '@/components/Template'

export const Route = createFileRoute('/my-account')({
  component: MyAccount,
})

function MyAccount() {
  const { userProfile } = useUserProfile()

  if (!userProfile) {
    return <div>Erro ao carregar dados da conta</div>
  }

  return (
    <Template>
      <div className="container mx-auto p-4 space-y-6">
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
              value={new Date(userProfile.created_at).toLocaleDateString(
                'pt-BR'
              )}
              icon={
                <Calendar className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
              }
            />
            <AccountCard
              title="Verificação"
              value={
                userProfile.email_verified ? 'Verificado' : 'Não verificado'
              }
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

          {/* Seção de detalhes do plano */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm md:shadow p-4 md:p-6"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Detalhes do Plano
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
                <span className="text-sm md:text-base text-gray-600">
                  Status
                </span>
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

            {/* Botões responsivos */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 md:gap-4">
              <Button
                variant="outline"
                size="sm"
                className="text-xs md:text-sm"
              >
                Alterar Plano
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs md:text-sm"
              >
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
        </motion.div>
      </div>
    </Template>
  )
}
