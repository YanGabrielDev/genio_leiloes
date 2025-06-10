import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ReactNode } from 'react'

export interface AccountCardProps {
  title: string
  value: string | number
  icon: ReactNode
  accentColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
  hoverAnimation?: boolean
  className?: string
}
export const AccountCard = ({ title, value, icon }: AccountCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle
            className="text-sm font-medium text-gray-500 truncate"
            title={title}
          >
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
