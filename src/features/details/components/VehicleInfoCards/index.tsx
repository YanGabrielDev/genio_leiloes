import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VehicleInfoCardsProps {
  year: string | number
  color: string
  leilaoName: string
  leilaoState: string
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function VehicleInfoCards({
  year,
  color,
  leilaoName,
  leilaoState,
}: VehicleInfoCardsProps) {
  return (
    <motion.div
      variants={fadeIn}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Ano
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{year || 'Não informado'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Cor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{color || 'Não informada'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Leilão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{leilaoName}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Localização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {leilaoState || 'Não informada'}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
