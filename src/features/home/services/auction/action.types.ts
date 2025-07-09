export interface ListAuctionParams {
  page?: number
  priceMax: number
  priceMin: number
  modelBrand: string
  year?: number
}

export interface FindVehicleById {
  veiculo_id: number
}

export interface Analysis {
  marca_modelo: string
  ano: string
  avaliacao: string
  imagens: string[]
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
