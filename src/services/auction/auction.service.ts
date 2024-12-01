import { Auction } from "@/interfaces/auction.interface"
import { api } from "@/lib/api"
import { getAuctionParams } from "./action.interface"

export const apiUrl = import.meta.env.VITE_API_URL ?? ''

const getAuction = async ({page}: getAuctionParams): Promise<Auction> => {
    const response = await api.get(apiUrl, {params: {page}})
    
    return response.data
}

export default {getAuction}