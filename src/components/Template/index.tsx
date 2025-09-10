// src/components/Template.tsx

import { Link, useNavigate } from '@tanstack/react-router'
import { Header } from '../Header'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/styles/animations'
import { ArrowLeft } from 'lucide-react'
import { useUserStore } from '@/store/user.store'
import { Footer } from '../Footer'

interface TemplateProps {
  children: React.ReactNode
  cityFilterOptions?: {
    value: string
    label: string
    id: string
  }[]
  toGo?: string
  showFilters?: boolean
}

export const Template = ({
  children,
  cityFilterOptions,
  toGo,
  showFilters,
}: TemplateProps) => {
  const navigate = useNavigate()
  const { setUserProfile } = useUserStore()
  const onLogin = () => {
    navigate({ to: '/login' })
    Cookies.remove('accessToken')
    setUserProfile(null)
  }
  const onLogout = () => {
    Cookies.remove('accessToken')
    localStorage.clear()
    window.location.href = '/'
    setUserProfile(null)
  }
  return (
    <main className="bg-gray-100 flex flex-col min-h-screen">
      <Header
        showFilters={showFilters}
        cityFilterOptions={cityFilterOptions}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto p-4 space-y-6"
      >
        {!!toGo && (
          <Link
            to="/"
            className="text-primary underline flex items-center gap-1"
          >
            <ArrowLeft size={18} className="text-primary text-sm" /> Voltar
          </Link>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-8"
        >
          {children}
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  )
}
