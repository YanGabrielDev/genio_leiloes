import { Input } from '../ui/input'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useUserStore } from '@/store/user.store'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { FavoritesDrawer } from './FavoritesDrawer'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'

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
  const [openFavorites, setOpenFavorites] = useState(false)
  const listFavorite = useListFavorite()

  const { setVehicleFiltersState, vehicleFiltersState } = useVehicleFilters()
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  const handleOpenFavorites = () => {
    if (!userProfile) {
      onLogin?.()
      return
    }
    setOpenFavorites(true)
  }

  return (
    <>
      <header className="bg-white px-12 w-full flex flex-col gap-4 py-4 border-b-primary border-b">
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold text-2xl flex items-center">
            Gênio Leilões
          </span>

          <div className="flex items-center gap-4 md:flex-row flex-col">
            <AuthButton user={user} onLogin={onLogin} onLogout={onLogout} />
            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenFavorites}
                className="relative hover:bg-red-50 hover:text-red-500"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {listFavorite?.data?.length}
                </span>
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="flex gap-1 items-start w-full md:flex-row flex-col">
            <div className="md:w-1/3 w-full">
              <Input
                placeholder="Buscar veículo"
                value={vehicleFiltersState.brandModelSearch}
                onChange={(event) => {
                  const value = event.target.value
                  setVehicleFiltersState((prevState) => ({
                    ...prevState,
                    brandModelSearch: value,
                  }))
                }}
              />
            </div>
            <div className="relative">
              <VehicleFilters />
            </div>
          </div>
        )}
      </header>

      <FavoritesDrawer
        open={openFavorites}
        onOpenChange={setOpenFavorites}
        listFavorite={listFavorite}
      />
    </>
  )
}
