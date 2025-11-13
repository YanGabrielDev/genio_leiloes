import { VehicleFiltersState } from '@/context/vehicle-filter.context'

export interface ListAuctionParams {
  page?: number
  priceMax?: number
  priceMin?: number
  modelBrand?: string
  year?: number
  city?: string
  condition?: 'conservado' | 'sucata' | undefined
  auctionStatus?: VehicleFiltersState['auctionStatus']
  items?: number
}

export interface FindVehicleById {
  veiculo_id: number
}

export interface Analysis {
  marca_modelo: string
  ano: string
  avaliacao: string
  imagens: string[]
  lote_id: number
}

export interface AnalysisListItem {
  id: number
  lote: string
  analise: string
  criado_em: string
}
export interface CurrentVehicleStatusValues {
  arrematante: null | string
  status: string
  tempo: number
  valor: string
  valorIncremento: string
}
export interface CurrentVehicleStatus {
  [key: number]: CurrentVehicleStatusValues
}

export interface ListLastMoves {
  arrematante: string
  statusLeilao: string
  valorIncremento: string
  valor: string
  tempo_restante: string
  ultimosLances: Array<{
    pre_arrematante: string
    valor: string
    data_hora: string
  }>
}
