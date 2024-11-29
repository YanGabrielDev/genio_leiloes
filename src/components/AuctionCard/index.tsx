interface AuctionCardProps {
    type: string;
    name: string;
    avaliacao: string
    year: number
}
export const AuctionCard = ({ year, avaliacao, name, type }: AuctionCardProps) => {
    return (
        <div
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col col-span-12 sm:col-span-6 lg:col-span-4"
        >
            <span className="text-xs text-gray-600">{type}</span>
            <span className="text-slate-950 font-medium mb-2">{name}</span>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <span className="text-xs text-gray-600">Avaliação</span>

                    <strong>R$ {avaliacao}</strong>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className="text-xs text-gray-600">Ano</span>

                    <strong>{year}</strong>
                </div>
            </div>
        </div>
    )
}