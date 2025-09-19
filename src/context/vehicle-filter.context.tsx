import { createContext, useContext, useState, ReactNode } from 'react'

export interface VehicleFiltersState {
  priceRange: [number, number]
  brandModelSearch: string
  year?: number
  condition?: 'conservado' | 'sucata'
  city?: string
  auctionStatus?: 'Em andamento' | 'Publicado'
}

interface VehicleFilterContextType {
  vehicleFiltersState: VehicleFiltersState
  setVehicleFiltersState: React.Dispatch<
    React.SetStateAction<VehicleFiltersState>
  >
}

const initialVehicleFiltersState: VehicleFiltersState = {
  priceRange: [0, 100000],
  brandModelSearch: '',
  year: undefined,
  condition: undefined,
  city: undefined,
  auctionStatus: undefined,
}

const initialVehicleFilterContext: VehicleFilterContextType = {
  vehicleFiltersState: initialVehicleFiltersState,
  setVehicleFiltersState: () => {},
}

export const VehicleFilterContext = createContext<VehicleFilterContextType>(
  initialVehicleFilterContext
)

interface VehicleFilterProviderProps {
  children: ReactNode
}

export const VehicleFilterProvider = ({
  children,
}: VehicleFilterProviderProps) => {
  const [vehicleFiltersState, setVehicleFiltersState] =
    useState<VehicleFiltersState>(initialVehicleFiltersState)

  return (
    <VehicleFilterContext.Provider
      value={{ vehicleFiltersState, setVehicleFiltersState }}
    >
      {children}
    </VehicleFilterContext.Provider>
  )
}

export const useVehicleFilters = () => {
  const context = useContext(VehicleFilterContext)
  if (context === undefined) {
    throw new Error(
      'useVehicleFilters must be used within a VehicleFilterProvider'
    )
  }
  return context
}
