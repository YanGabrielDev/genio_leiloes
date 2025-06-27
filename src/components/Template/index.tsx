// src/components/Template.tsx

import { Link, useNavigate } from '@tanstack/react-router'
import { Header } from '../Header'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/styles/animations'
import { ArrowLeft } from 'lucide-react'
import { useUserStore } from '@/store/user.store'

interface TemplateProps {
  children: React.ReactNode
  cityFilterOptions?: {
    value: string
    label: string
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
    setUserProfile(null)
    window.location.href = '/'
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
        {children}
      </motion.div>
    </main>
  )
}
