import auctionService from "@/services/auction/auction.service"
import { useQuery } from "@tanstack/react-query"
import { useListAuctionParams } from "./types"

export const useListAuction = ({ page, priceMax, priceMin }: useListAuctionParams) => {
  return useQuery({
    queryKey: ['auctionList', page, priceMax, priceMin],
    queryFn: () => auctionService.getAuction({ page, priceMax, priceMin }),
  })
}
