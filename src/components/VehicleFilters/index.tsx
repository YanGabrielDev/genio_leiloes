import { useState, useEffect, useMemo } from 'react'
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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown, MapPin, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { DropdownFilter } from '../DropdownFilter'

interface VehicleFiltersProps {
  cityFilterOptions?: {
    value: string
    label: string
    id: string
  }[]
}

export function VehicleFilters({ cityFilterOptions }: VehicleFiltersProps) {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
  const [open, setOpen] = useState(false)
  const [citySearchTerm, setCitySearchTerm] = useState('')

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
  const [localCondition, setLocalCondition] = useState<
    'conservado' | 'sucata' | undefined
  >(vehicleFiltersState.condition)
  const [localCity, setLocalCity] = useState<string | undefined>(
    vehicleFiltersState.city
  )

  // Filtrar cidades baseado no termo de busca
  const filteredCities = useMemo(() => {
    if (!cityFilterOptions) return []

    return cityFilterOptions.filter(
      (city) =>
        city.label.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
        city.value.toLowerCase().includes(citySearchTerm.toLowerCase())
    )
  }, [cityFilterOptions, citySearchTerm])

  // Sincroniza estados locais com o estado global ao abrir o popup
  useEffect(() => {
    if (open) {
      setLocalMinPrice(vehicleFiltersState.priceRange[0])
      setLocalMaxPrice(vehicleFiltersState.priceRange[1])
      setLocalBrandModelSearch(vehicleFiltersState.brandModelSearch || '')
      setLocalYear(vehicleFiltersState.year?.toString() || '')
      setLocalCondition(vehicleFiltersState.condition)
      setLocalCity(vehicleFiltersState.city)
      setCitySearchTerm('')
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

  const handleClearCity = () => {
    setLocalCity(undefined)
    setCitySearchTerm('')
  }

  const handleApplyFilters = () => {
    setVehicleFiltersState({
      priceRange: [localMinPrice, localMaxPrice],
      brandModelSearch: localBrandModelSearch,
      year: localYear ? parseInt(localYear) : undefined,
      condition: localCondition,
      city: localCity,
    })
    setOpen(false)
  }
  console.log(localCity)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Search /> Filtros
      </Button>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] "
        onWheel={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Filtrar Leilões</DialogTitle>
          <DialogDescription>
            Selecione as opções de filtro para refinar sua busca.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campo de busca por Marca/Modelo */}
          <div className="space-y-2">
            <Label
              htmlFor="brand-model-search"
              className="text-sm font-medium leading-none"
            >
              Marca/Modelo
            </Label>
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
            <Label
              htmlFor="price-range"
              className="text-sm font-medium leading-none"
            >
              Faixa de Preço (R$)
            </Label>
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
            <Label htmlFor="year" className="text-sm font-medium leading-none">
              Ano do Veículo
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="Digite o ano (ex: 2010)"
              value={localYear}
              onChange={handleYearChange}
              className="w-full"
            />
          </div>

          {/* Filtro de Condição */}
          <div className="space-y-2">
            <Label className="text-sm font-medium leading-none">Condição</Label>
            <RadioGroup
              value={localCondition || 'todos'}
              onValueChange={(value) =>
                setLocalCondition(
                  value === 'todos'
                    ? undefined
                    : (value as 'conservado' | 'sucata')
                )
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="todos" id="todos" />
                <Label htmlFor="todos">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conservado" id="conservado" />
                <Label htmlFor="conservado">Conservado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sucata" id="sucata" />
                <Label htmlFor="sucata">Sucata</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Filtro de Cidade - Melhorado */}
          {cityFilterOptions && (
            <div className="space-y-2">
              <Label className="text-sm font-medium leading-none">Cidade</Label>

              <DropdownFilter
                options={cityFilterOptions}
                placeholder="Selecione uma cidade"
                onSelectValue={(value) => setLocalCity(value.value)}
              />
              {/* Dica para mobile */}
              <p className="text-xs text-muted-foreground">
                Digite o nome da cidade para buscar rapidamente
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
