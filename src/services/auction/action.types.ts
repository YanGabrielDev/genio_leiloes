export interface getAuctionParams {
  page?: number;
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
