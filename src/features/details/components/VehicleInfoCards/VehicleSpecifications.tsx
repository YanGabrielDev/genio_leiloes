interface VehicleSpecificationsProps {
  year: string | number
  color: string
  leilaoName: string
  leilaoState: string
}

export function VehicleSpecifications({
  year,
  color,
  leilaoName,
  leilaoState,
}: VehicleSpecificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Ano</p>
        <p className="text-base font-semibold">{year || 'Não informado'}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Cor</p>
        <p className="text-base font-semibold">{color || 'Não informada'}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Leilão</p>
        <p className="text-base font-semibold">{leilaoName}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Cidade</p>
        <p className="text-base font-semibold">
          {leilaoState || 'Não informada'}
        </p>
      </div>
    </div>
  )
}
