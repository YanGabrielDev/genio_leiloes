import { Auction, Cities } from '@/interfaces/auction.interface'
import { api } from '@/lib/api'
import {
  FindVehicleById,
  ListAuctionParams,
  Analysis,
  CurrentVehicleStatus,
  ListLastMoves,
} from './action.types'
import { Vehicles } from '@/interfaces/vehicle.interface'
import { apiUrl, auctionBaseUrl } from '@/constant/configs'
import Cookies from 'js-cookie'
const cookies = Cookies
const listAuction = async ({
  page,
  priceMax,
  priceMin,
  modelBrand,
  year,
  condition,
  city,
  auctionStatus,
}: ListAuctionParams): Promise<Auction> => {
  const response = await api.get(`${apiUrl}/leiloes/`, {
    params: {
      page,
      gasto_minino: priceMin,
      gasto_maximo: priceMax,
      marca_modelo: modelBrand,
      status_leilao: auctionStatus,
      ano: year ?? null,
      is_sucata: condition ? condition === 'sucata' : undefined,
      cidade: city,
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
  const token = cookies.get('accessToken')
  const response = await api.post(`${apiUrl}/leiloes/analisar-veiculo/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response?.data?.avaliacao_visual
}

const listAuctionCities = async (): Promise<Cities[]> => {
  const response = await api.get(`${apiUrl}/leiloes/geral/`)

  return response?.data
}

const favoriteVehicle = async (veiculoId: number): Promise<any> => {
  const token = cookies.get('accessToken')
  const response = await api.post(
    `${apiUrl}/leiloes/favoritar-veiculo/`,
    { veiculo_id: veiculoId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  return response?.data?.avaliacao_visual
}

const listCurrentVehicleStatus = async (
  url: string
): Promise<CurrentVehicleStatus> => {
  const response = await api.get(url)
  return response?.data
}

const listFavorite = async (): Promise<Vehicles[]> => {
  const token = cookies.get('accessToken')

  const response = await api.get(`${apiUrl}/leiloes/favoritar-veiculo/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}

const listLastMoves = async (vehicleId: number): Promise<ListLastMoves> => {
  const response = await api.get(
    `${auctionBaseUrl}/single-leilao-status/${vehicleId}`
  )
  return response?.data
}

const listAnalysis = async (): Promise<any[]> => {
  const token = cookies.get('accessToken')
  const response = await api.get(`${apiUrl}/leiloes/analises-veiculo/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  return response?.data
}
export default {
  listAuction,
  findVehicleById,
  analysis,
  listCurrentVehicleStatus,
  favoriteVehicle,
  listFavorite,
  listLastMoves,
  listAuctionCities,
  listAnalysis,
}
