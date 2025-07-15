import { Input } from '../ui/input'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useUserStore } from '@/store/user.store'

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
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  return (
    <header className="bg-white px-12 w-full flex flex-col gap-4 py-4  border-b-primary border-b">
      <div className="flex justify-between items-center">
        <span className="text-primary font-semibold text-2xl flex items-center">
          Gênio Leilões
        </span>

        <AuthButton user={user} onLogin={onLogin} onLogout={onLogout} />
      </div>

      {showFilters && (
        <div className="flex gap-1 items-start w-full md:flex-row flex-col ">
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
