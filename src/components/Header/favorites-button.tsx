
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/store/user.store';
import { useListFavorite } from '@/features/home/hooks/use-list-favorite';
import { motion } from 'framer-motion';
import { FavoritesDrawer } from './favorites-drawer';
import { useNavigate } from '@tanstack/react-router';

export const FavoritesButton = () => {
  const [openFavorites, setOpenFavorites] = useState(false);
  const { userProfile } = useUserStore();
  const listFavorite = useListFavorite();
  const { toast } = useToast();
  const navigate = useNavigate()


  const onLogin = () => {
    navigate({
      to: '/login',
    })
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
      });
      return;
    }

    if (listFavorite.data?.length === 0) {
      toast({
        description: 'Você ainda não tem veículos favoritados',
        variant: 'default',
      });
      return;
    }

    setOpenFavorites(true);
  };

  return (
    <>
      <motion.div
        className="md:flex hidden"
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
      <FavoritesDrawer
        open={openFavorites}
        onOpenChange={setOpenFavorites}
        listFavorite={listFavorite}
      />
    </>
  );
};
