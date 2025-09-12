export interface Vehicles {
  id: number
  lote: null | number
  condicao: 'Sucata' | 'Conservado'
  chassi: string
  placa: string
  marca_modelo: string
  avaliacao_atualizada: string
  motor: string
  tempo_restante: string
  cor: string
  imagens: string[]
  link_lance_atual: string
  ano: number
  avaliacao: string
  tipo: string
  is_sucata: boolean
  created_at: string
  updated_at: string
  leilao: {
    nome: string
    estado: string
    cidade: string
  }
}
