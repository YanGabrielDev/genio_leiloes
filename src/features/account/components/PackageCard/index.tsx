import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

interface Package {
  id: number
  title: string
  description: string
  quantidade_moedas: string
  preco: string
}

interface PackageCardProps {
  pack: Package
  recommended?: boolean
  className?: string
}

export function PackageCard({
  pack,
  recommended = false,
  className,
}: PackageCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        `border rounded-xl p-6 relative h-full flex flex-col transition-all duration-200 shadow-sm hover:shadow-md ${
          recommended
            ? 'border-2 border-yellow-400 bg-gradient-to-b from-yellow-50 to-white'
            : 'border-gray-200 bg-white'
        }`,
        className
      )}
    >
      {recommended && (
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full flex items-center z-10 shadow-md">
          <Zap className="h-3 w-3 mr-1" />
          <span className="text-xs">Recomendado</span>
        </div>
      )}

      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">{pack.title}</h3>
          <div className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
            {pack.quantidade_moedas.replace('.00', '')} moedas
          </div>
        </div>

        <p className="text-gray-600 mb-5">{pack.description}</p>

        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-3xl font-bold text-gray-900">
              R$ {pack.preco}
            </span>
            <span className="text-sm text-gray-500 ml-1">/único</span>
          </div>
        </div>

        <div className="mb-6 flex-grow">
          <h4 className="text-sm font-semibold mb-3 text-gray-700">
            Vantagens:
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">
                {pack.quantidade_moedas} moedas para usar
              </span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Entrega imediata</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">Suporte 24/7</span>
            </li>
          </ul>
        </div>

        <Button
          variant={recommended ? 'default' : 'outline'}
          size="lg"
          className={`w-full mt-auto ${recommended ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' : ''}`}
          onClick={() =>
            navigate({
              to: '/payment',
              search: {
                stripe_monthly_price_id: pack.id.toString(),
              },
            })
          }
        >
          Comprar agora
        </Button>
      </div>
    </motion.div>
  )
}
