import auctionService from "@/services/auction/auction.service"
import { useQuery } from "@tanstack/react-query"
import { useListAuctionParams } from "./useListAuction.types"

export const useListAuction = ({page}: useListAuctionParams) => {
    
    return useQuery({
        queryKey: ['auctionList', page],
        queryFn: () =>  auctionService.getAuction({page}),
    })
}