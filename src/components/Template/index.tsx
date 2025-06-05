// src/components/Template.tsx

import { useNavigate } from '@tanstack/react-router'
import { Header } from '../Header'
import Cookies from 'js-cookie'
import {
  UserProfileContext,
  useUserProfile,
} from '@/context/user-profile.context'
interface TemplateProps {
  children: React.ReactNode
  handleChangeSearch?: (search: string) => void
  search?: string
  cityFilterOptions?: {
    value: string
    label: string
  }[]
}

export const Template = ({
  children,
  handleChangeSearch,
  search,
  cityFilterOptions,
}: TemplateProps) => {
  const navigate = useNavigate()
  const { setUserProfile } = useUserProfile()
  const onLogin = () => {
    navigate({ to: '/login' })
    Cookies.remove('accessToken')
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
      {children}
    </main>
  )
}
