import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useNavigate } from '@tanstack/react-router'

interface AuthButtonProps {
  user?: {
    name: string
    email: string
  } | null
  onLogin?: () => void
  onLogout?: () => void
}

export const AuthButton = ({ user, onLogin, onLogout }: AuthButtonProps) => {
  const navigate = useNavigate()
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  }

  const goToMyAccount = () => {
    navigate({ to: '/account' })
  }

  const goToAlert = () => {
    navigate({ to: '/auction-alert' })
  }
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2"
    >
      {user ? (
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={goToMyAccount}
            >
              Minha conta
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={goToAlert}>
              Meus Alertas
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={onLogin} variant="primary" className="rounded-xl">
          <User className="w-4 h-4" />
          <span>Entrar</span>
        </Button>
      )}
    </motion.div>
  )
}
