import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AnalysisListItem } from '../services/auction/action.types'
import { SafeMarkdownRenderer } from '@/components/SafeMarkdownRenderer'

export function AnalysesDrawer({
  open,
  onOpenChange,
  listAnalysis,
  isLoading,
}: {
  open: boolean
  isLoading: boolean
  onOpenChange: (open: boolean) => void
  listAnalysis?: AnalysisListItem[]
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full max-w-4xl px-4">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-2xl font-bold">
              Minhas Análises
            </DrawerTitle>
            <DrawerDescription>
              {listAnalysis?.length || 0} análises realizadas
            </DrawerDescription>
          </DrawerHeader>

          <div className="pb-6 px-4 overflow-y-auto h-[calc(90vh-100px)]">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ))}
              </div>
            ) : listAnalysis?.length === 0 || !listAnalysis ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-muted-foreground mb-4">
                  Você ainda não fez nenhuma análise.
                </p>
                <Button onClick={() => onOpenChange(false)}>
                  Explorar veículos
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {listAnalysis?.map((item) => (
                  <AccordionItem value={`item-${item.id}`} key={item.id}>
                    <AccordionTrigger>
                      <div className="flex justify-between w-full pr-4">
                        <span>Lote: {item.lote}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(item.criado_em), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                      <SafeMarkdownRenderer content={item.analise} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
