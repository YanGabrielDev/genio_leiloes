import {useState, useMemo } from "react";
import "./App.css";
import { AuctionCard } from "./components/AuctionCard";
import { Header } from "./components/Header";
import { auctionMock } from "./mock/auction.mock";
import { useListAuction } from "./hooks/useGetAuction";
import { SkeletonLoaderGrid } from "./components/SkeletonLoaderGrid";
import { PaginationSection } from "./components/PaginationSection";
import { useFilteredVehicles } from "./hooks/useFilteredVehicles";

function App() {
  const [searchVehicle, setSearchVehicle] = useState("");
  const [page, setPage] = useState<number>(1);

  const listAuction = useListAuction({ page });
  const { filteredVehicles, filterBySearch } = useFilteredVehicles(
    listAuction.data?.results || []
  );

  const cityFilterOptions = useMemo(
    () => auctionMock.map((auction) => ({ value: auction.cidade, label: auction.cidade })),
    []
  );

  const handleSearchChange = (newSearchValue: string) => {
    setSearchVehicle(newSearchValue);
    filterBySearch(newSearchValue);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <main className="bg-blue-100 flex flex-col min-h-screen">
      <Header
        handleChangeSearch={handleSearchChange}
        search={searchVehicle}
        cityFilterOptions={cityFilterOptions}
      />
      <div className="px-12 py-8 grid grid-cols-12 gap-4">
        {listAuction.isLoading ? (
          <SkeletonLoaderGrid count={24} />
        ) : (
          filteredVehicles.map((item) => (
            <AuctionCard
              key={item.id}
              year={item.ano}
              avaliacao={item.avaliacao}
              name={item.marca_modelo}
              type={item.tipo}
            />
          ))
        )}
      </div>
      <div className="w-full flex items-center justify-center mb-8">
        <PaginationSection
          page={page}
          handleChangePage={handlePageChange}
          totalItems={listAuction.data?.count ?? 0}
        />
      </div>
    </main>
  );
}

export default App;
