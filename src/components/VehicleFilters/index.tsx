import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Não precisamos mais do DropdownFilter aqui, então remova o import
// import { DropdownFilter } from "@/components/DropdownFilter";
import { useVehicleFilters } from '@/context/vehicle-filter.context'; // Importe VehicleFiltersState

export function VehicleFilters() {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters();
  const [open, setOpen] = useState(false);

  // Estados locais para os valores dos inputs enquanto o popup está aberto
  const [localMinPrice, setLocalMinPrice] = useState<number>(vehicleFiltersState.priceRange[0]);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(vehicleFiltersState.priceRange[1]);
  // Novo estado local para o campo de texto "Marca/Modelo"
  const [localBrandModelSearch, setLocalBrandModelSearch] = useState<string>(vehicleFiltersState.brandModelSearch || '');

  // Sincroniza estados locais com o estado global ao abrir o popup
  useEffect(() => {
    if (open) {
      setLocalMinPrice(vehicleFiltersState.priceRange[0]);
      setLocalMaxPrice(vehicleFiltersState.priceRange[1]);
      // Sincroniza o novo campo de busca
      setLocalBrandModelSearch(vehicleFiltersState.brandModelSearch || '');
    }
  }, [vehicleFiltersState, open]); // Depende do objeto inteiro agora

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newMin = isNaN(value) ? 0 : value;
    setLocalMinPrice(newMin);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    const newMax = isNaN(value) ? 100000 : value;
    setLocalMaxPrice(newMax);
  };

  // Novo handler para o campo "Marca/Modelo"
  const handleBrandModelSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalBrandModelSearch(event.target.value);
  };

  const handleApplyFilters = () => {
    setVehicleFiltersState({
      priceRange: [localMinPrice, localMaxPrice],
      // Atualiza o estado global com o valor do campo de busca
      brandModelSearch: localBrandModelSearch,
    });
    console.log("Filtros aplicados:", {
      minPrice: localMinPrice,
      maxPrice: localMaxPrice,
      brandModelSearch: localBrandModelSearch,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Filtros
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtrar Leilões</DialogTitle>
          <DialogDescription>
            Selecione as opções de filtro para refinar sua busca.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campo de busca por Marca/Modelo */}
          <div className="space-y-2">
            <label htmlFor="brand-model-search" className="text-sm font-medium leading-none">
              Marca/Modelo
            </label>
            <Input
              id="brand-model-search"
              type="text"
              placeholder="Marca ou Modelo do veículo"
              value={localBrandModelSearch}
              onChange={handleBrandModelSearchChange}
              className="w-full"
            />
          </div>

          {/* Faixa de Preço (mantém a estrutura anterior) */}
          <div className="space-y-2">
            <label htmlFor="price-range" className="text-sm font-medium leading-none">
              Faixa de Preço (R$)
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex-1 space-y-1">
                <Input
                  id="min-price"
                  type="number"
                  placeholder="R$ Mín."
                  value={localMinPrice === 0  ? '' : localMinPrice}
                  onChange={handleMinPriceChange}
                  className="w-full"
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="flex-1 space-y-1">
                <Input
                  id="max-price"
                  type="number"
                  placeholder="R$ Máx."
                  value={localMaxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}