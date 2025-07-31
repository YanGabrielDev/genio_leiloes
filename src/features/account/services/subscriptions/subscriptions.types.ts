export interface Plan {
  id: number
  stripe_monthly_price_id: string | null
  stripe_annual_price_id: string | null
  title: string
  description: string
  features_description: string
  features: string[]
  monthly_price: string
  annual_price: string
  requests_ai: number
  recommended: boolean
}

export interface UserPlan {
  plan: Plan
  start_date: string
  end_date: string | null
  is_active: boolean
  requests_ai_used: number
}

export interface ListSubscriptionsPlans {
  saldo_moedas: number
  pacotes_disponiveis: {
    id: number
    title: string
    description: string
    quantidade_moedas: string
    preco: string
  }[]
}

export interface CreateCheckoutSession {
  pack_id: string
}
