'use client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateUser, LoginUser } from '@/features/auth/services/auth/auth.types'
import { useCreateUser } from '@/features/auth/hooks/use-create-user'
import { useToast } from '@/hooks/use-toast'
import { useLoginUser } from '@/features/auth/hooks/use-login-user'
import { registerFormSchema } from '@/features/auth/schemas/register-form.schema'
import { loginFormSchema } from '@/features/auth/schemas/login-form.schema'
import { VerificationCodeForm } from '../VerificationCodeForm'
import { SignUpForm } from '../SignUpForm'
import { SignForm } from '../SignForm'

interface LoginForm {}

export const LoginForm = ({}: LoginForm) => {
  const [showSignUpForm, setShowSignUpform] = useState(false)
  const [showVerificationForm, setShowVerificationForm] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  const { toast } = useToast()

  const openSignUpForm = () => {
    setShowSignUpform(true)
  }
  const closeSignUpForm = () => {
    setShowSignUpform(false)
  }

  const handleVerificationSuccess = () => {
    toast({
      title: 'Conta verificada com sucesso!',
      description: 'Agora você pode fazer login com suas credenciais.',
      variant: 'default',
    })
    setShowVerificationForm(false)
    closeSignUpForm()
  }
  const showVerification = () => setShowVerificationForm(true)

  return showVerificationForm ? (
    <VerificationCodeForm
      email={registeredEmail}
      onSuccess={handleVerificationSuccess}
      onResendCode={() =>
        toast({
          title: 'Código reenviado',
          description: 'Verifique seu e-mail novamente.',
          variant: 'default',
        })
      }
    />
  ) : showSignUpForm ? (
    <SignUpForm
      closeSignUpForm={closeSignUpForm}
      showVerification={showVerification}
    />
  ) : (
    <SignForm openSignUpForm={openSignUpForm} />
  )
}
