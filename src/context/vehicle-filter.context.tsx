import { createContext, useContext, useState, ReactNode } from 'react'

// 1. Interface para o estado dos filtros de veículo
export interface VehicleFiltersState {
  priceRange: [number, number]
  brandModelSearch: string
  year?: number
  // Outros filtros de veículo futuros seriam adicionados aqui, por exemplo:
  // vehicleType: string | null; // ex: 'carro', 'moto', 'caminhão'
  // vehicleBrand: string[];    // ex: ['Ford', 'Chevrolet']
}

// 2. Interface para o contexto dos filtros de veículo
interface VehicleFilterContextType {
  vehicleFiltersState: VehicleFiltersState
  setVehicleFiltersState: React.Dispatch<
    React.SetStateAction<VehicleFiltersState>
  > // Ou, para atualizações parciais, uma função como:
  // updateVehicleFilter: (key: keyof VehicleFiltersState, value: any) => void;
}

// 3. Valor inicial para o contexto
const initialVehicleFiltersState: VehicleFiltersState = {
  priceRange: [0, 100000],
  brandModelSearch: '',
  year: undefined,
}

const initialVehicleFilterContext: VehicleFilterContextType = {
  vehicleFiltersState: initialVehicleFiltersState,
  setVehicleFiltersState: () => {}, // Função vazia para o valor inicial
}

// 4. Criação do Contexto
export const VehicleFilterContext = createContext<VehicleFilterContextType>(
  initialVehicleFilterContext
)

// 5. Provedor do Contexto
interface VehicleFilterProviderProps {
  children: ReactNode
}

export const VehicleFilterProvider = ({
  children,
}: VehicleFilterProviderProps) => {
  const [vehicleFiltersState, setVehicleFiltersState] =
    useState<VehicleFiltersState>(initialVehicleFiltersState)

  // Opcional: Função para atualizar filtros individualmente, se preferir
  // const updateVehicleFilter = useCallback((key: keyof VehicleFiltersState, value: any) => {
  //   setVehicleFiltersState(prevState => ({
  //     ...prevState,
  //     [key]: value
  //   }));
  // }, []);

  return (
    <VehicleFilterContext.Provider
      value={{
        vehicleFiltersState,
        setVehicleFiltersState /*, updateVehicleFilter */,
      }}
    >
      {children}
    </VehicleFilterContext.Provider>
  )
}

// 6. Hook customizado para consumir o Contexto
export const useVehicleFilters = () => {
  const context = useContext(VehicleFilterContext)
  if (context === undefined) {
    throw new Error(
      'useVehicleFilters must be used within a VehicleFilterProvider'
    )
  }
  return context
}
