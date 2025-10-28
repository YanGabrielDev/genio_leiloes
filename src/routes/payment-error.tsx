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
import { XCircle } from 'lucide-react'
import { Template } from '@/components/Template'

export const Route = createFileRoute('/payment-error')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

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
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold">
                Erro no pagamento
              </CardTitle>
              <CardDescription className="text-gray-500">
                Ocorreu um problema ao processar seu pagamento.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() =>
                  navigate({ to: '/', search: { city: undefined } })
                }
              >
                Voltar para a tela inicial
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </Template>
  )
}
