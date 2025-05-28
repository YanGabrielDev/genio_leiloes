// src/components/Template.tsx

import { useNavigate } from "@tanstack/react-router";
import { Header } from "../Header"

interface TemplateProps {
  children: React.ReactNode;
  handleChangeSearch?: (search: string) => void;
  search?: string;
  cityFilterOptions?:{
    value: string;
    label: string;
  }[];
}

export const Template = ({
  children,
  handleChangeSearch,
  search,
  cityFilterOptions,
}: TemplateProps) => {
  const navigate = useNavigate()
  
  const onLogin = () => {
      navigate({ to: '/login' })
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
