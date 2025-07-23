import { Input } from '../ui/input'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useUserStore } from '@/store/user.store'
import { Button } from '../ui/button'
import { Heart, HeartOff } from 'lucide-react'
import { useState } from 'react'
import { FavoritesDrawer } from './FavoritesDrawer'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'

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
  const { toast } = useToast()
  const { setVehicleFiltersState, vehicleFiltersState } = useVehicleFilters()
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  const handleOpenFavorites = () => {
    if (!userProfile) {
      toast({
        title: 'Ação necessária',
        description: 'Faça login para acessar seus favoritos',
        variant: 'default',
        action: (
          <Button variant="outline" size="sm" onClick={onLogin}>
            Fazer login
          </Button>
        ),
      })
      return
    }

    if (listFavorite.data?.length === 0) {
      toast({
        description: 'Você ainda não tem veículos favoritados',
        variant: 'default',
      })
      return
    }

    setOpenFavorites(true)
  }

  return (
    <>
      <header className="bg-white px-4 sm:px-12 w-full flex flex-col gap-4 py-4 border-b-primary border-b">
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold text-2xl flex items-center">
            Gênio Leilões
          </span>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenFavorites}
                className="relative group"
                aria-label="Favoritos"
              >
                <div className="relative p-1">
                  {listFavorite.data?.length ? (
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  ) : (
                    <Heart className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                  )}

                  {listFavorite.data?.length ? (
                    <motion.span
                      key="count"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white"
                    >
                      {listFavorite.data.length}
                    </motion.span>
                  ) : null}
                </div>
              </Button>
            </motion.div>

            <AuthButton user={user} onLogin={onLogin} onLogout={onLogout} />
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
            <div className="relative flex gap-4 items-center">
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
