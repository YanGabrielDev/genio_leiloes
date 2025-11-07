import { History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { AuthButton } from './auth-button';
import { FavoritesButton } from './favorites-button';
import { useUserStore } from '@/store/user.store';

interface HeaderActionsProps {
  user: { name: string; email: string } | null;
  onLogin?: () => void;
  onLogout?: () => void;
  handleOpenAnalyses: () => void;
}

export const HeaderActions = ({
  user,
  onLogin,
  onLogout,
  handleOpenAnalyses,
}: HeaderActionsProps) => {
  const { userProfile } = useUserStore();

  return (
    <div className="flex items-center space-x-4">
      <FavoritesButton />

      {userProfile && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleOpenAnalyses}
            aria-label="Minhas Análises"
          >
            <History className="h-5 w-5 text-gray-400 group-hover:text-primary" />
          </Button>
        </motion.div>
      )}
      <AuthButton user={user} onLogin={onLogin} onLogout={onLogout} />
    </div>
  );
};