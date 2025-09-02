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
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VehicleFiltersProps {
  cityFilterOptions?: {
    value: string
    label: string
  }[]
}

export function VehicleFilters({ cityFilterOptions }: VehicleFiltersProps) {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
  const [open, setOpen] = useState(false)
  const [cityPopoverOpen, setCityPopoverOpen] = useState(false)

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

  // Sincroniza estados locais com o estado global ao abrir o popup
  useEffect(() => {
    if (open) {
      setLocalMinPrice(vehicleFiltersState.priceRange[0])
      setLocalMaxPrice(vehicleFiltersState.priceRange[1])
      setLocalBrandModelSearch(vehicleFiltersState.brandModelSearch || '')
      setLocalYear(vehicleFiltersState.year?.toString() || '')
      setLocalCondition(vehicleFiltersState.condition)
      setLocalCity(vehicleFiltersState.city)
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
      condition: localCondition,
      city: localCity,
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

          {/* Filtro de Cidade */}
          {cityFilterOptions && (
            <div className="space-y-2">
              <Label
                htmlFor="city"
                className="text-sm font-medium leading-none"
              >
                Cidade
              </Label>
              <Popover open={cityPopoverOpen} onOpenChange={setCityPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={cityPopoverOpen}
                    className="w-full justify-between"
                  >
                    {localCity
                      ? cityFilterOptions.find(
                          (option) => option.value === localCity
                        )?.label
                      : 'Selecione uma cidade'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Buscar cidade..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value="Todas as cidades"
                          onSelect={() => {
                            setLocalCity(undefined)
                            setCityPopoverOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              !localCity ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          Todas as cidades
                        </CommandItem>
                        {cityFilterOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            onSelect={() => {
                              setLocalCity(option.value)
                              setCityPopoverOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                localCity === option.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
