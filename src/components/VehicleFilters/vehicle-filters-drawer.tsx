import { useState, useRef } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'
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

export function VehicleFiltersDrawer({
  cityFilterOptions,
}: VehicleFiltersProps) {
  const [open, setOpen] = useState(false)
  const filtersContentRef = useRef<VehicleFiltersContentRef>(null)

  const handleApplyFilters = () => {
    filtersContentRef.current?.applyFilters()
    setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)} size="sm">
        <Filter /> Filtros
      </Button>
      <DrawerContent
        className="sm:max-w-[425px] max-h-[100vh] "
        onWheel={(e) => e.stopPropagation()}
      >
        <DrawerHeader>
          <DrawerTitle>Filtrar Leilões</DrawerTitle>
          <DrawerDescription>
            Selecione as opções de filtro para refinar sua busca.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 py-4 px-4">
          <VehicleFiltersContent
            ref={filtersContentRef}
            cityFilterOptions={cityFilterOptions}
          />
        </div>
        <DrawerFooter className="flex flex-row gap-2">
          <DrawerClose asChild>
            <Button variant="outline" className="flex-1">
              Cancelar
            </Button>
          </DrawerClose>
          <Button onClick={handleApplyFilters} className="flex-1">
            Aplicar Filtros
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
