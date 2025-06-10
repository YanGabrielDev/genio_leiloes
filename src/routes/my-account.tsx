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
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
              <p className="text-gray-500 mt-2">
                Gerencie suas informações e plano de assinatura
              </p>
            </div>
            <PlanBadge plan={userProfile.current_plan} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AccountCard
              title="Nome"
              value={userProfile.name}
              icon={<User className="h-5 w-5 text-blue-500" />}
            />
            <AccountCard
              title="Email"
              value={userProfile.email}
              icon={<Mail className="h-5 w-5 text-blue-500" />}
            />
            <AccountCard
              title="Data de Criação"
              value={new Date(userProfile.created_at).toLocaleDateString()}
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
            />
            <AccountCard
              title="Verificação"
              value={
                userProfile.email_verified ? 'Verificado' : 'Não verificado'
              }
              icon={
                <ShieldCheck
                  className={`h-5 w-5 ${
                    userProfile.email_verified
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                />
              }
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Detalhes do Plano</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Plano Atual</span>
                <span className="font-medium">
                  {userProfile.current_plan.plan_name}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">
                  {userProfile.current_plan.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Data de Início</span>
                <span className="font-medium">
                  {new Date(
                    userProfile.current_plan.start_date
                  ).toLocaleDateString()}
                </span>
              </div>
              {userProfile.current_plan.end_date && (
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Data de Término</span>
                  <span className="font-medium">
                    {new Date(
                      userProfile.current_plan.end_date
                    ).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="outline">Alterar Plano</Button>
              <Button variant="outline">Atualizar Dados</Button>
              <Button variant="destructive">Cancelar Assinatura</Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Template>
  )
}
