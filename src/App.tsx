import { useState, useMemo } from "react";
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
    () =>
      auctionMock.map((auction) => ({
        value: auction.cidade,
        label: auction.cidade,
      })),
    []
  );

  const handleSearchChange = (newSearchValue: string) => {
    setSearchVehicle(newSearchValue);
    filterBySearch(newSearchValue);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);
console.log(filteredVehicles);

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
            // <Dialog key={item.id}>
            //   <DialogTrigger asChild>
                <AuctionCard
                  year={item.ano}
                  avaliacao={item.avaliacao}
                  name={item.marca_modelo}
                  type={item.tipo}
                  imagens={item.imagens}
                />
            //   </DialogTrigger>
            //   <DialogContent className="sm:max-w-[425px]">
            //     <div className="p-4">
            //       <h2 className="text-xl font-bold mb-2">{item.marca_modelo}</h2>
            //       <p className="text-gray-600 mb-1">Tipo: {item.tipo}</p>
            //       <p className="text-gray-600 mb-1">Ano: {item.ano}</p>
            //       <p className="text-gray-600 mb-1">
            //         Avaliação: R$ {item.avaliacao}
            //       </p>
            //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            //         {item.imagens.map((img, index) => (
            //           <img
            //             key={index}
            //             src={img}
            //             alt={`Imagem ${index + 1}`}
            //             className="w-full h-auto object-cover rounded"
            //           />
            //         ))}
            //       </div>
            //     </div>
            //   </DialogContent>
            // </Dialog>
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
