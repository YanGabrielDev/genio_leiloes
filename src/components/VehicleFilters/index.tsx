import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVehicleFilters } from '@/context/vehicle-filter.context'

export function VehicleFilters() {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
  const [open, setOpen] = useState(false)

  // Estados locais
  const [localMinPrice, setLocalMinPrice] = useState<number>(
    vehicleFiltersState.priceRange[0]
  )
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(
    vehicleFiltersState.priceRange[1]
  )
  const [localBrandModelSearch, setLocalBrandModelSearch] = useState<string>(
    vehicleFiltersState.brandModelSearch || ''
  )
  const [localYear, setLocalYear] = useState<string>(
    vehicleFiltersState.year?.toString() || ''
  )

  // Sincroniza estados locais com o estado global ao abrir o popup
  useEffect(() => {
    if (open) {
      setLocalMinPrice(vehicleFiltersState.priceRange[0])
      setLocalMaxPrice(vehicleFiltersState.priceRange[1])
      setLocalBrandModelSearch(vehicleFiltersState.brandModelSearch || '')
      setLocalYear(vehicleFiltersState.year?.toString() || '')
    }
  }, [vehicleFiltersState, open])

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    const newMin = isNaN(value) ? 0 : value
    setLocalMinPrice(newMin)
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    const newMax = isNaN(value) ? 100000 : value
    setLocalMaxPrice(newMax)
  }

  const handleBrandModelSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocalBrandModelSearch(event.target.value)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalYear(event.target.value)
  }

  const handleApplyFilters = () => {
    setVehicleFiltersState({
      priceRange: [localMinPrice, localMaxPrice],
      brandModelSearch: localBrandModelSearch,
      year: localYear ? parseInt(localYear) : undefined,
    })
    setOpen(false)
  }

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
            <label
              htmlFor="brand-model-search"
              className="text-sm font-medium leading-none"
            >
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

          {/* Faixa de Preço */}
          <div className="space-y-2">
            <label
              htmlFor="price-range"
              className="text-sm font-medium leading-none"
            >
              Faixa de Preço (R$)
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex-1 space-y-1">
                <Input
                  id="min-price"
                  type="number"
                  placeholder="R$ Mín."
                  value={localMinPrice === 0 ? '' : localMinPrice}
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

          {/* Campo de Ano Único */}
          <div className="space-y-2">
            <label htmlFor="year" className="text-sm font-medium leading-none">
              Ano do Veículo
            </label>
            <Input
              id="year"
              type="number"
              placeholder="Digite o ano (ex: 2010)"
              value={localYear}
              onChange={handleYearChange}
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
