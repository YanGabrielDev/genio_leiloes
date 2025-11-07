import { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import {
  VehicleFiltersContent,
  VehicleFiltersContentRef,
} from './vehicle-filters-content'

interface VehicleFiltersProps {
  cityFilterOptions?: {
    value: string
    label: string
    id: number
  }[]
}

export function VehicleFilters({ cityFilterOptions }: VehicleFiltersProps) {
  const [open, setOpen] = useState(false)
  const filtersContentRef = useRef<VehicleFiltersContentRef>(null)

  const handleApplyFilters = () => {
    filtersContentRef.current?.applyFilters()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)} size="sm">
        <Search /> Filtros
      </Button>
      <DialogContent
        className="sm:max-w-[425px] max-h-[90vh] "
        onWheel={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Filtrar Leilões</DialogTitle>
          <DialogDescription>
            Selecione as opções de filtro para refinar sua busca.
          </DialogDescription>
        </DialogHeader>
        <VehicleFiltersContent
          ref={filtersContentRef}
          cityFilterOptions={cityFilterOptions}
        />
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
