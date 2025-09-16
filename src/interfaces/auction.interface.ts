import { Vehicles } from './vehicle.interface'

export interface Auction {
  count: number
  next: string
  previous: null | number
  results: Vehicles[]
}

export interface Cities {
  id: number
  nome: string
  estado: string
  cidade: string
  data: null
  encerramento: string
  status: string
  link: string
  localizacao: string
  created_at: string
  updated_at: string
}
