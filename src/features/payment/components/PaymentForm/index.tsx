import { useState, FormEvent } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

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
      setError('Stripe ainda não carregou.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }), // Exemplo: R$10,00
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

  if (success) return <p>✅ Pagamento aprovado!</p>

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processando...' : 'Pagar'}
      </button>
    </form>
  )
}
