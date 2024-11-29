import { Vehicles } from "./vehicle.interface";

export interface Auction {
  count: number;
  next: string;
  previous: null | number;
  results: Vehicles[];
}
