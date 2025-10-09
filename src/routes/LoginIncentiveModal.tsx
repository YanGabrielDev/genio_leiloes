import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Sparkles, UserPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUserStore } from '@/store/user.store'

export function LoginIncentiveModal() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { userProfile } = useUserStore()
  const navigate = useNavigate()
  const onOpenChange = (value: boolean) => {
    setShowLoginModal(value)
  }
  const handleLogin = () => {
    onOpenChange(false)
    navigate({ to: '/login' })
  }
  useEffect(() => {
    if (!userProfile) {
      const hasSeenModal = sessionStorage.getItem('hasSeenLoginIncentiveModal')

      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setShowLoginModal(true)
          sessionStorage.setItem('hasSeenLoginIncentiveModal', 'true')
        }, 30000)

        return () => clearTimeout(timer)
      }
    }
  }, [userProfile])
  return (
    <Dialog open={showLoginModal} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-gradient-to-br from-gray-50 to-blue-50">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Desbloqueie todo o potencial!
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2">
            Crie uma conta para salvar seus veículos favoritos, realizar analise
            dos veículos, receber alertas personalizados e muito mais.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:justify-center">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Agora não
          </Button>
          <Button onClick={handleLogin}>
            <UserPlus className="mr-2 h-4 w-4" /> Acessar conta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
