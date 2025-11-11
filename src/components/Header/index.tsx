import { Bell, History } from 'lucide-react'
import { AuthButton } from './auth-button'
import { VehicleFilters } from '../VehicleFilters'
import { useUserStore } from '@/store/user.store'
import { Button } from '../ui/button'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { CoinAction } from './coin-action'
import { AnalysesDrawer } from '@/features/home/components/analyses-drawer'
import { useListAnalysis } from '@/features/home/hooks/use-list-analysis'
import { HeaderLogo } from './header-logo'
import { SearchBar } from './search-bar'
import { FavoritesButton } from './favorites-button'
import { HeaderActions } from './header-actions'
import { VehicleFiltersDrawer } from '../VehicleFilters/vehicle-filters-drawer'

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
  const [openAnalyses, setOpenAnalyses] = useState(false)
  const { data: listAnalysis, isLoading: isLoadingAnalysis } = useListAnalysis()
  const navigate = useNavigate()
  const { toast } = useToast()
  const user = userProfile
    ? { name: userProfile.name, email: userProfile.email }
    : null

  const handleOpenAnalyses = () => {
    if (!userProfile) {
      toast({
        description: 'Faça login para ver suas análises.',
        variant: 'info',
      })
      navigate({ to: '/login' })
      return
    }
    if (listAnalysis?.length === 0) {
      toast({ description: 'Você ainda não fez nenhuma análise.' })
    }
    setOpenAnalyses(true)
  }
  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between h-16">
              <HeaderLogo />

              <HeaderActions
                user={user}
                onLogin={onLogin}
                onLogout={onLogout}
                handleOpenAnalyses={handleOpenAnalyses}
              />
            </div>

            {/* Search and Filters */}
            <div className="w-full flex">
              <div className="flex gap-4 items-start w-full md:flex-row flex-col">
                {showFilters && <SearchBar />}

                <div className="relative hidden sm:flex gap-4 sm:items-center w-full flex-col sm:flex-row">
                  <div className=" flex gap-4 ">
                    {showFilters && (
                      <VehicleFiltersDrawer
                        cityFilterOptions={cityFilterOptions}
                      />
                    )}
                    {showFilters && userProfile && (
                      <Button
                        onClick={() => navigate({ to: '/auction-alert' })}
                        size="sm"
                      >
                        <Bell className="sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:flex">Criar Alerta</span>
                      </Button>
                    )}
                    <div className="ml-auto">
                      {userProfile && <CoinAction />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnalysesDrawer
        open={openAnalyses}
        onOpenChange={setOpenAnalyses}
        listAnalysis={listAnalysis}
        isLoading={isLoadingAnalysis}
      />
    </>
  )
}
