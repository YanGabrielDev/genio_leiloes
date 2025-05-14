import auctionService from "@/services/auction/auction.service";
import { useMutation } from "@tanstack/react-query";
import {  PostAnalysis } from "@/services/auction/action.interface";



export const usePostAnalysis = () => {
 return useMutation({
    mutationFn: (data: PostAnalysis) => auctionService.getAnalysis(data)
 })
};