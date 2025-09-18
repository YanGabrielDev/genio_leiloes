import { Heart, Search, Sparkles, Coins, Bell } from 'lucide-react'
import { Input } from '../ui/input'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useVehicleFilters } from '@/context/vehicle-filter.context'
import { useUserStore } from '@/store/user.store'
import { Button } from '../ui/button'
import { useState, useEffect } from 'react'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import logo from '../../../public/genio_icon.png'
import { Link, useNavigate } from '@tanstack/react-router'
import { CoinAction } from './coin-action'
import { FavoritesDrawer } from './favorites-drawer'
import { useDebounce } from '@/hooks/use-debounce'
import { DropdownFilter } from '../DropdownFilter'

interface HeaderProps {
  cityFilterOptions?: {
    value: string
    label: string
    id: number
  }[]
  showFilters?: boolean
  onLogin?: () => void
  onLogout?: () => void
}

export const Header = ({
  showFilters,
  onLogin,
  onLogout,
  cityFilterOptions,
}: HeaderProps) => {
  const { userProfile } = useUserStore()
  const [openFavorites, setOpenFavorites] = useState(false)
  const listFavorite = useListFavorite()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setVehicleFiltersState, vehicleFiltersState } = useVehicleFilters()
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  const [localSearchTerm, setLocalSearchTerm] = useState(
    vehicleFiltersState.brandModelSearch
  )
  const debouncedSearchTerm = useDebounce(localSearchTerm, 1000)

  useEffect(() => {
    setVehicleFiltersState((prevState) => ({
      ...prevState,
      brandModelSearch: debouncedSearchTerm,
    }))
  }, [debouncedSearchTerm, setVehicleFiltersState])

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/">
                <div className="flex items-center space-x-2">
                  <img
                    src={logo}
                    alt="Gênio da lampada com um matelo na mão logo"
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Gênio Leilão
                    </h1>
                    <p className="text-xs text-gray-500">Veículos do Detran</p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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

            {/* Search and Filters */}
            <div className="w-full flex">
              <div className="flex gap-4 items-start w-full md:flex-row flex-col">
                {showFilters && (
                  <div className="relative flex-1 max-w-2xl min-w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por modelo ou marca"
                      value={localSearchTerm}
                      onChange={(event) => {
                        setLocalSearchTerm(event.target.value)
                      }}
                      className="pl-10"
                    />
                  </div>
                )}

                <div className="relative flex gap-4 items-center w-full flex-col sm:flex-row">
                  <div className=" flex gap-4 items-center">
                    {showFilters && (
                      <VehicleFilters cityFilterOptions={cityFilterOptions} />
                    )}

                    {showFilters && userProfile && (
                      <Button
                        onClick={() => navigate({ to: '/auction-alert' })}
                        size="sm"
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Criar Alerta
                      </Button>
                    )}
                  </div>

                  {userProfile && <CoinAction />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <FavoritesDrawer
        open={openFavorites}
        onOpenChange={setOpenFavorites}
        listFavorite={listFavorite}
      />
    </>
  )
}
