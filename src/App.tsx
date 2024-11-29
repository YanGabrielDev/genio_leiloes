import { useEffect, useState } from "react";
import "./App.css";
import { AuctionCard } from "./components/AuctionCard";
import { Header } from "./components/Header";
import { auctionMock } from "./mock/auction.mock";
import { Vehicles } from "./interfaces/vehicle.interface";
import auctionService from "./services/auction.service";
import { Auction } from "./interfaces/auction.interface";

function App() {
  const [searchVehicle, setSearchVehicle] = useState("");
  const [auctionVehicles, setAuctionVehicles] = useState<Array<Vehicles>>([]);
  const [auctionVehiclesData, setAuctionVehiclesData] = useState<Auction>();

  const initialVisibility =  auctionVehiclesData?.results || []
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

  const auctionLoader = async () => {
    const getAuctionData = await auctionService.getAuction()
    console.log(getAuctionData);
    
    setAuctionVehiclesData(getAuctionData)
  }
  
  useEffect(() => {
    auctionLoader()
    setAuctionVehicles(initialVisibility);
  }, []);

  return (
    <main className="bg-blue-100 flex flex-col min-h-screen">
      <Header handleChangeSearch={handleChangeSearch} search={searchVehicle} cityFilterOptions={cityFilterOptions}/>
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {auctionVehicles.slice(0,20).map((item, index) => (
          <AuctionCard
            key={index}
            year={item.ano}
            avaliacao={item.avaliacao}
            name={item.marca_modelo}
            type={item.tipo}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
