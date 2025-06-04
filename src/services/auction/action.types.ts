export interface GetAuctionParams {
  page?: number;
  priceMax: number;
  priceMin: number;
  modelBrand: string;
}

export interface GetVehicleById {
  veiculo_id: number;
}

export interface PostAnalysis {
  marca_modelo: string;
  ano: string;
  avaliacao: string;
  imagens: string[];
}
