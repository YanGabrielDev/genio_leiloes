import { cities } from '@/mock/cities.mock'
import { DropdownFilter } from '../DropdownFilter'
import { Input } from '../ui/input'
import { useMemo } from 'react'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { Button } from '../ui/button'
import { useUserStore } from '@/store/user.store'
import { useNavigate } from '@tanstack/react-router'

interface HeaderProps {
  cityFilterOptions?: {
    value: string
    label: string
  }[]
  showFilters?: boolean
  onLogin?: () => void
  onLogout?: () => void
}

export const Header = ({ showFilters, onLogin, onLogout }: HeaderProps) => {
  const { userProfile } = useUserStore()
  const { setVehicleFiltersState, vehicleFiltersState } = useVehicleFilters()
  const navigate = useNavigate()

  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  const handleCreateAlert = () => {
    navigate({ to: '/auction-alert' })
  }

  return (
    <header className="bg-white px-12 w-full flex flex-col gap-4 py-4 border-b-primary border-b">
      <div className="flex justify-between items-center">
        <span className="text-primary font-semibold text-2xl flex items-center">
          Busca leilões
        </span>

        <div className="flex items-center gap-4">
          {user && (
            <Button variant="outline" onClick={handleCreateAlert}>
              Criar Alerta
            </Button>
          )}

          <AuthButton user={user} onLogin={onLogin} onLogout={onLogout} />
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-1 items-start w-full md:flex-row flex-col">
          <div className="md:w-1/3 w-full">
            <Input
              placeholder="Buscar veiculo"
              value={vehicleFiltersState.brandModelSearch}
              onChange={(event) => {
                const value = event.target.value
                setVehicleFiltersState((prevState) => {
                  return {
                    ...prevState,
                    brandModelSearch: value,
                  }
                })
              }}
            />
          </div>
          <div className="relative">
            <VehicleFilters />
          </div>
        </div>
      )}
    </header>
  )
}
