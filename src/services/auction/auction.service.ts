import { Auction } from "@/interfaces/auction.interface"
import { api } from "@/lib/api"
import { PostAnalysis, getAuctionParams, GetVehicleById } from "./action.interface"
import { Vehicles } from "@/interfaces/vehicle.interface"

export const apiUrl = import.meta.env.VITE_API_URL ?? ''

const getAuction = async ({page}: getAuctionParams): Promise<Auction> => {
    const response = await api.get(apiUrl, {params: {page}})
    
    return response.data
}

const getVehicleById = async ({veiculo_id}: GetVehicleById): Promise<Vehicles> => {
    const response = await api.get(apiUrl, {params: {veiculo_id}})
    
    return response?.data?.results[0]
}

const getAnalysis = async (data: PostAnalysis): Promise<any> => {
    const response = await api.post(apiUrl + "analisar-veiculo/", data)
    
    return response?.data?.avaliacao_visual
}

export default { getAuction, getVehicleById, getAnalysis}