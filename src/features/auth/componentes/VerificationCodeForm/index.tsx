import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useVerifyEmailUser } from '@/features/auth/hooks/use-verify-email-user'

interface VerificationCodeFormProps {
  email: string
  onSuccess: () => void
  onResendCode: () => void
}

export const VerificationCodeForm = ({
  email,
  onSuccess,
  onResendCode,
}: VerificationCodeFormProps) => {
  const form = useFormContext()
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [code, setCode] = useState<number>()
  const { mutateAsync: verifyEmailUser } = useVerifyEmailUser()

  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulando verificação
      if (code) {
        await verifyEmailUser(code)
      } else {
        toast({
          title: 'Erro na verificação',
          description: 'Código inválido ou expirado.',
          variant: 'destructive',
        })
        return
      }
      onSuccess()
    } catch (error) {
      toast({
        title: 'Erro na verificação',
        description: 'Código inválido ou expirado.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onResendCode()
    } catch (error) {
      toast({
        title: 'Erro ao reenviar',
        description: 'Não foi possível reenviar o código.',
        variant: 'destructive',
      })
    } finally {
      setIsResending(false)
    }
  }
  const handleChangeCode = (newCode: number) => setCode(newCode)

  return (
    <div className={`w-full flex gap-4 flex-col min-w-80`}>
      <h1 className="font-bold text-blue-600 text-5xl">Verificação</h1>
      <h2 className="text-blue-600 text-base opacity-70 font-medium">
        Enviamos um código para <span className="font-bold">{email}</span>
      </h2>

      <FormField
        control={form.control}
        name="verificationCode"
        rules={{ required: 'Código obrigatório!' }}
        render={({ field }) => (
          <Input
            placeholder="Código de verificação"
            type="number"
            {...field}
            onChange={(e) => handleChangeCode(Number(e.target.value))}
          />
        )}
      />

      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        variant="default"
        className="w-full"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span className="font-normal">Verificar</span>
      </Button>

      <div className="flex justify-center mt-4">
        <Button
          variant="link"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-blue-600"
        >
          {isResending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Reenviar código'
          )}
        </Button>
      </div>
    </div>
  )
}
