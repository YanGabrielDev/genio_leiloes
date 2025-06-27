import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { Template } from '@/components/Template'
import { useUserStore } from '@/store/user.store'
import userService from '@/features/auth/services/auth/auth.services'
import { useEffect } from 'react'
export const Route = createFileRoute('/payment-success')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { setUserProfile } = useUserStore()
  const updateUserProfile = async () => {
    try {
      const user = await userService.profileUser()
      setUserProfile(user)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    updateUserProfile()
  }, [])
  return (
    <Template toGo="/account">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold">
                Pagamento realizado
              </CardTitle>
              <CardDescription className="text-gray-500">
                O seu pagamento foi realizado com sucesso.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button variant="outline" onClick={() => navigate({ to: '/' })}>
                Voltar para a tela inicial
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </Template>
  )
}
