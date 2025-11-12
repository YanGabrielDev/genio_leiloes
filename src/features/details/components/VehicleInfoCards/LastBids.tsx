interface Bid {
  pre_arrematante: string
  valor: string
  data_hora: string
}

interface LastBidsProps {
  bids: Bid[]
}

export function LastBids({ bids }: LastBidsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Últimos Lances</h3>
      <div className="space-y-3">
        {bids.map((lance, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div>
              <p className="font-medium">{lance.pre_arrematante}</p>
              <p className="text-sm text-muted-foreground">{lance.data_hora}</p>
            </div>
            <p className="text-lg font-bold">R$ {lance.valor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
