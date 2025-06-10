import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface AccountCardProps {
  title: string
  value: string
  icon: ReactNode
  className?: string
}

export const AccountCard = ({ title, value, icon }: AccountCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }} // Remove animação no modo compacto
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className={cn('h-full transition-all', 'hover:shadow-md')}>
        <CardHeader
          className={cn(
            'flex flex-row items-center justify-between pb-2 space-y-0'
          )}
        >
          <CardTitle className={cn('font-medium text-gray-500')}>
            {title}
          </CardTitle>
          <div className={''}>{icon}</div>
        </CardHeader>
        <CardContent className={''}>
          <div
            className={cn('font-bold', 'text-2xl', 'truncate')}
            title={value}
          >
            {value}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
