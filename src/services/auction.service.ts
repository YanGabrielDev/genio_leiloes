import { Auction } from "@/interfaces/auction.interface"
import { Vehicles } from "@/interfaces/vehicle.interface"
import { api } from "@/lib/api"

export const apiUrl = import.meta.env.VITE_API_URL ?? ''

const getAuction = async (): Promise<Auction> => {
    const response = await api.get(apiUrl)
    
    return response.data
}

export default {getAuction}