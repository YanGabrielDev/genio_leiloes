import { Link, useNavigate } from '@tanstack/react-router'
import { Heart, Home, Bell, Search } from 'lucide-react'
import { FavoritesDrawer } from '../Header/favorites-drawer'
import { useState } from 'react'
import { useListFavorite } from '@/features/home/hooks/use-list-favorite'
import { useUserStore } from '@/store/user.store'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'

export function BottomBar() {
  const [openFavorites, setOpenFavorites] = useState(false)
  const listFavorite = useListFavorite()
  const { userProfile } = useUserStore()
  const { toast } = useToast()
  const navigate = useNavigate()

  const onLogin = () => {
    navigate({ to: '/login' })
  }

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
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
      <div
        className={`grid h-full max-w-lg ${userProfile ? 'grid-cols-4' : 'grid-cols-3'} mx-auto font-medium`}
      >
        <Link
          to="/"
          search={{ city: undefined }}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <Home className="w-5 h-5 mb-1 text-gray-500" />
          <span className="text-sm text-gray-500">Início</span>
        </Link>
        <button
          onClick={handleOpenFavorites}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <Heart className="w-5 h-5 mb-1 text-gray-500" />
          <span className="text-sm text-gray-500">Favoritos</span>
        </button>
        <Link
          to="/search"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <Search className="w-5 h-5 mb-1 text-gray-500" />
          <span className="text-sm text-gray-500">Buscar</span>
        </Link>
        {userProfile && (
          <Link
            to="/auction-alert"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
          >
            <Bell className="w-5 h-5 mb-1 text-gray-500" />
            <span className="text-sm text-gray-500">Alertas</span>
          </Link>
        )}
      </div>

      <FavoritesDrawer
        open={openFavorites}
        onOpenChange={setOpenFavorites}
        listFavorite={listFavorite}
      />
    </div>
  )
}
