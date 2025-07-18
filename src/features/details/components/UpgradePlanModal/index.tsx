import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

interface UpgradePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UpgradePlanModal({
  open,
  onOpenChange,
}: UpgradePlanModalProps) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Limite de análises atingido</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Você atingiu o limite de análises disponíveis no seu plano atual.
            Atualize seu plano para continuar usando o Analisador IA.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Mais tarde
            </Button>
            <Button onClick={() => navigate({ to: '/account' })}>
              Atualizar plano
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
