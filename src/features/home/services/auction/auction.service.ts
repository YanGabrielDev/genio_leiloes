import { Auction } from '@/interfaces/auction.interface'
import { api } from '@/lib/api'
import {
  FindVehicleById,
  ListAuctionParams,
  Analysis,
  CurrentVehicleStatus,
} from './action.types'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { apiUrl } from '@/constant/configs'

const listAuction = async ({
  page,
  priceMax,
  priceMin,
  modelBrand,
  year,
}: ListAuctionParams): Promise<Auction> => {
  const response = await api.get(`${apiUrl}/leiloes/`, {
    params: {
      page,
      gasto_minino: priceMin,
      gasto_maximo: priceMax,
      marca_modelo: modelBrand,
      ano: year ?? null,
    },
  })
  return response.data
}

const findVehicleById = async ({
  veiculo_id,
}: FindVehicleById): Promise<Vehicles> => {
  const response = await api.get(`${apiUrl}/leiloes/`, {
    params: { veiculo_id },
  })
  return response?.data?.results[0]
}

const analysis = async (data: Analysis): Promise<any> => {
  const response = await api.post(`${apiUrl}/leiloes/analisar-veiculo/`, data)
  return response?.data?.avaliacao_visual
}

const listCurrentVehicleStatus = async (
  url: string
): Promise<CurrentVehicleStatus> => {
  const response = await api.get(url)
  return response?.data
}

export default {
  listAuction,
  findVehicleById,
  analysis,
  listCurrentVehicleStatus,
}
