import { ProfileData } from '@/features/auth/services/auth/auth.types'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

// 2. Interface para o contexto do usuário
interface UserProfileContextType {
  userProfile: ProfileData | null
  setUserProfile: (data: ProfileData | null) => void
  isLoading: boolean
}

// 3. Valor inicial para o contexto
const initialUserProfileContext: UserProfileContextType = {
  userProfile: null,
  isLoading: false,
  setUserProfile: () => {}, // Função vazia para o valor inicial
}

// 4. Criação do Contexto
export const UserProfileContext = createContext<UserProfileContextType>(
  initialUserProfileContext
)

// 5. Provedor do Contexto
interface UserProfileProviderProps {
  children: ReactNode
}

export const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Adicione um estado de loading

  useEffect(() => {
    const userJson = localStorage.getItem('user')
    setIsLoading(false) // Marca o carregamento como completo

    if (userJson) {
      try {
        const user = JSON.parse(userJson)
        setUserProfile(user)
      } catch (error) {
        console.error('Erro ao analisar dados do usuário:', error)
        setUserProfile(null) // Reseta o perfil do usuário em caso de erro
      }
    }
  }, [])

  return (
    <UserProfileContext.Provider
      value={{ userProfile, setUserProfile, isLoading }}
    >
      {children}
    </UserProfileContext.Provider>
  )
}
// 6. Hook customizado para consumir o Contexto
export const useUserProfile = () => {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return {
    userProfile: context.userProfile,
    setUserProfile: context.setUserProfile,
    isLoading: context.isLoading, // Adicione isso
  }
}
