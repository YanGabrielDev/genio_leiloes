import {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { DropdownFilter } from '../DropdownFilter'

interface VehicleFiltersContentProps {
  cityFilterOptions?: {
    value: string
    label: string
    id: number
  }[]
}

export interface VehicleFiltersContentRef {
  applyFilters: () => void
}

export const VehicleFiltersContent = forwardRef<
  VehicleFiltersContentRef,
  VehicleFiltersContentProps
>(({ cityFilterOptions }, ref) => {
  const { vehicleFiltersState, setVehicleFiltersState } = useVehicleFilters()
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

  // Sincroniza estados locais com o estado global
  useEffect(() => {
    setLocalMinPrice(vehicleFiltersState.priceRange[0])
    setLocalMaxPrice(vehicleFiltersState.priceRange[1])
    setLocalBrandModelSearch(vehicleFiltersState.brandModelSearch || '')
    setLocalYear(vehicleFiltersState.year?.toString() || '')
    setLocalCondition(vehicleFiltersState.condition)
    setLocalCity(vehicleFiltersState.city)
    setCitySearchTerm('')
  }, [vehicleFiltersState])

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    const newMin = isNaN(value) ? 0 : value
    setLocalMinPrice(newMin)
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    const newMax = isNaN(value) || event.target.value === '' ? 0 : value
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
  }

  useImperativeHandle(ref, () => ({
    applyFilters: handleApplyFilters,
  }))

  return (
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
              value={localMaxPrice === 0 ? '' : localMaxPrice}
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
              value === 'todos' ? undefined : (value as 'conservado' | 'sucata')
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
            fullWidth
            showSearch
            options={cityFilterOptions}
            placeholder="Selecione uma cidade"
            onSelectValue={(value) => setLocalCity(value?.value)}
          />
          {/* Dica para mobile */}
          <p className="text-xs text-muted-foreground">
            Digite o nome da cidade para buscar rapidamente
          </p>
        </div>
      )}
    </div>
  )
})
