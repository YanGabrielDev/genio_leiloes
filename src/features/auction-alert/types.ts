export type AlertCondition = 'antes' | 'exato' | 'depois'

export interface AlertFormData {
  momento_alerta: AlertCondition
  valor_referencia: string // String for input handling
  marca_modelo: string
  ano_de: string // String for input handling
  ano_ate: string // String for input handling
  cor: string
  contato: string
  alerta_global: boolean
  enviar_uma_vez: boolean
}
