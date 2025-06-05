import { ProfileData } from '@/services/users/users.types'
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
}

// 3. Valor inicial para o contexto
const initialUserProfileContext: UserProfileContextType = {
  userProfile: null,
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

  useEffect(() => {
    const userJson = localStorage.getItem('user')

    if (userJson) {
      const user = JSON.parse(userJson)
      setUserProfile(user)
    }
  }, [])
  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
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
  return context
}
