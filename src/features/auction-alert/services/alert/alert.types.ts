export interface Alert {
  id: number
  momento_alerta: 'antes' | 'exato' | 'depois' // Assumindo esses valores
  valor_referencia: string
  marca_modelo: string
  ano_de: number
  ano_ate: number
  cor: string
  contato: string
  alerta_global: boolean
  enviar_uma_vez: boolean
  criado_em: string
  usuario: number
}

export interface CreateAlertPayload {
  momento_alerta: 'antes' | 'exato' | 'depois'
  valor_referencia: number
  marca_modelo: string
  ano_de: number
  ano_ate: number
  cor: string
  contato: string
  alerta_global: boolean
  enviar_uma_vez: boolean
}

export interface UpdateAlertPayload {
  momento_alerta?: 'antes' | 'exato' | 'depois'
  valor_referencia?: number
  marca_modelo?: string
  ano_de?: number
  ano_ate?: number
  cor?: string
  contato?: string
  alerta_global?: boolean
  enviar_uma_vez?: boolean
}
export interface GetAlertDetailsParams {
  id: number
}

export interface UpdateAlertParams {
  id: number
  data: UpdateAlertPayload
}

export interface DeleteAlertParams {
  id: number
}
