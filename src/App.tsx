import { useEffect, useState } from "react";
import "./App.css";
import { AuctionCard } from "./components/AuctionCard";
import { Header } from "./components/Header";
import { auctionMock } from "./mock/auction.mock";
import { Vehicles } from "./interfaces/vehicle.interface";

import { Skeleton } from "./components/ui/skeleton";
import { PaginationSection } from "./components/PaginationSection";
import { useListAuction } from "./hooks/useGetAuction";
import { Auction } from "./interfaces/auction.interface";

function App() {
  const [searchVehicle, setSearchVehicle] = useState("");

  const [auctionVehicles, setAuctionVehicles] = useState<Array<Vehicles>>([]);
  const [auctionVehiclesData, setAuctionVehiclesData] = useState<Auction>();
  const [page, setPage] = useState<number>(1);

  const listAuction = useListAuction({ page });
  const initialVisibility = auctionVehiclesData?.results || [];
  const cityFilterOptions = auctionMock.map((auction) => {
    return { value: auction.cidade, label: auction.cidade };
  });
  const handleChangeAuctionVehicles = (newSearchValue: string) => {
    const newAuctionVehicles = initialVisibility.filter((vehicle) => {
      const vehicleName = vehicle.marca_modelo.toLowerCase();
      const searchVehiclename = newSearchValue.toLowerCase();

      return vehicleName.includes(searchVehiclename);
    });
    setAuctionVehicles(newAuctionVehicles);
  };

  const handleChangeSearch = (newSearchValue: string) => {
    setSearchVehicle(newSearchValue);

    handleChangeAuctionVehicles(newSearchValue);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if(listAuction.data?.results){

      setAuctionVehicles(listAuction.data?.results)
    }
  }, [listAuction.isLoading, page, listAuction.data]);


  return (
    <main className="bg-blue-100 flex flex-col min-h-screen">
      <Header
        handleChangeSearch={handleChangeSearch}
        search={searchVehicle}
        cityFilterOptions={cityFilterOptions}
      />
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {listAuction.isLoading
          ? Array.from({ length: 24 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-32 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4"
              />
            ))
          : auctionVehicles?.map((item, index) => (
              <AuctionCard
                key={index}
                year={item.ano}
                avaliacao={item.avaliacao}
                name={item.marca_modelo}
                type={item.tipo}
              />
            ))}
      </div>
      <div className="w-full flex items-center justify-center mb-8">
        <PaginationSection
          page={page}
          handleChangePage={handleChangePage}
          totalItems={listAuction.data?.count ?? 0}
        />
      </div>
    </main>
  );
}

export default App;
