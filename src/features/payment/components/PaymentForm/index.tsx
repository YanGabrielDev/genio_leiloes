'use client'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button' // Exemplo usando Shadcn UI (se tiver)

export function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!stripe || !elements) {
      setLoading(false)
      return
    }

    try {
      // Exemplo de chamada para o backend criar um PaymentIntent
      const res = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Exemplo: R$ 10,00
      })

      const { clientSecret } = await res.json()

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      })

      if (result.error) {
        setError(result.error.message || 'Erro ao processar pagamento.')
      } else if (result.paymentIntent?.status === 'succeeded') {
        setSuccess(true)
      }
    } catch (err) {
      setError('Erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  if (success) return <p>✅ Pagamento realizado com sucesso!</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processando...' : 'Pagar'}
      </Button>
    </form>
  )
}
