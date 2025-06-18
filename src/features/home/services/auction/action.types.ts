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
