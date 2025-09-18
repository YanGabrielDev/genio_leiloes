import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <span className="text-white">{user.name}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

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
