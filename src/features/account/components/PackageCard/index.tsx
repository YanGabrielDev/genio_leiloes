// src/features/account/components/PacoteCard.tsx
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

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
}

export function PackageCard({ pack, recommended = false }: PackageCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`border rounded-lg p-4 relative ${
        recommended ? 'border-2 border-yellow-400' : 'border-gray-200'
      } bg-white`}
    >
      {recommended && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Zap className="h-3 w-3 mr-1" />
          Recomendado
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{pack.title}</h3>
        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
          {pack.quantidade_moedas} moedas
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{pack.description}</p>

      <div className="mb-4">
        <div className="flex items-end">
          <span className="text-2xl font-bold">R$ {pack.preco}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold mb-2">Vantagens:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">
              {pack.quantidade_moedas} moedas para usar
            </span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">Entrega imediata</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm">Suporte 24/7</span>
          </li>
        </ul>
      </div>

      <Button
        variant={recommended ? 'default' : 'secondary'}
        size="sm"
        className="w-full"
        onClick={() =>
          navigate({
            to: '/payment',
            search: {
              pacote_id: pack.id.toString(),
            },
          })
        }
      >
        Comprar agora
      </Button>
    </motion.div>
  )
}
