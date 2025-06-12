// src/components/Template.tsx

import { Link, useNavigate } from '@tanstack/react-router'
import { Header } from '../Header'
import Cookies from 'js-cookie'
import { useUserProfile } from '@/context/user-profile.context'
import { motion } from 'framer-motion'
import { staggerContainer } from '@/styles/animations'
import { ArrowLeft } from 'lucide-react'

interface TemplateProps {
  children: React.ReactNode
  handleChangeSearch?: (search: string) => void
  search?: string
  cityFilterOptions?: {
    value: string
    label: string
  }[]
  toGo?: string
}

export const Template = ({
  children,
  handleChangeSearch,
  search,
  cityFilterOptions,
  toGo,
}: TemplateProps) => {
  const navigate = useNavigate()
  const { setUserProfile } = useUserProfile()
  const onLogin = () => {
    navigate({ to: '/login' })
    Cookies.remove('accessToken')
    localStorage.clear()
    setUserProfile(null)
  }

  return (
    <main className="bg-gray-100 flex flex-col min-h-screen">
      <Header
        handleChangeSearch={handleChangeSearch}
        search={search}
        cityFilterOptions={cityFilterOptions}
        onLogin={onLogin}
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
