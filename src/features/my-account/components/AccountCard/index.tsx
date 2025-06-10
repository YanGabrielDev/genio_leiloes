import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AccountCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export const AccountCard = ({ title, value, icon }: AccountCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full transition-all hover:shadow-sm md:hover:shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 space-y-0 md:pb-2">
          <CardTitle className="text-xs font-medium text-gray-500 sm:text-sm md:text-base">
            {title}
          </CardTitle>
          <div className="scale-75 sm:scale-90 md:scale-100">{icon}</div>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 md:p-4">
          <div
            className="text-sm font-bold sm:text-base md:text-lg lg:text-xl truncate"
            title={value}
          >
            {value}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
