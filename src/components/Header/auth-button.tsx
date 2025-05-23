import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AuthButtonProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
  };
  onLogin?: () => void;
  onLogout?: () => void;
}

export const AuthButton = ({
  isAuthenticated = false,
  user,
  onLogin,
  onLogout,
}: AuthButtonProps) => {
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-4 py-2 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={onLogin}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 transition-all"
        >
          <User className="w-4 h-4" />
          <span>Entrar</span>
        </Button>
      )}
    </motion.div>
  );
};