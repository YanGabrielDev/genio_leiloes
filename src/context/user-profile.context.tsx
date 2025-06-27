// import { ProfileData } from '@/features/auth/services/auth/auth.types'
// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useEffect,
// } from 'react'

// // 1. Interface para o contexto do usuário
// interface UserProfileContextType {
//   userProfile: ProfileData | null
//   setUserProfile: (data: ProfileData | null) => void
//   isLoading: boolean
// }

// // 2. Valor inicial para o contexto
// const initialUserProfileContext: UserProfileContextType = {
//   userProfile: null,
//   isLoading: true, // Inicializa o estado de loading como true
//   setUserProfile: () => {}, // Função vazia para o valor inicial
// }

// // 3. Criação do Contexto
// export const UserProfileContext = createContext<UserProfileContextType>(
//   initialUserProfileContext
// )

// // 4. Provedor do Contexto
// interface UserProfileProviderProps {
//   children: ReactNode
// }

// export const UserProfileProvider = ({ children }: UserProfileProviderProps) => {
//   const [userProfile, setUserProfile] = useState<ProfileData | null>(null)
//   const [isLoading, setIsLoading] = useState(true) // Inicializa o estado de loading como true

//   useEffect(() => {
//     const userJson = localStorage.getItem('user')

//     if (userJson) {
//       try {
//         const user = JSON.parse(userJson)
//         setUserProfile(user)
//         console.log('user', user)
//       } catch (error) {
//         console.error('Erro ao analisar dados do usuário:', error)
//         setUserProfile(null) // Reseta o perfil do usuário em caso de erro
//       } finally {
//         setIsLoading(false) // Define o estado de loading como false após a operação
//       }
//     } else {
//       setIsLoading(false) // Define o estado de loading como false se não houver dados do usuário
//     }
//   }, [])

//   return (
//     <UserProfileContext.Provider
//       value={{ userProfile, setUserProfile, isLoading }}
//     >
//       {children}
//     </UserProfileContext.Provider>
//   )
// }

// // 5. Hook customizado para consumir o Contexto
// export const useUserProfile = () => {
//   const context = useContext(UserProfileContext)
//   if (context === undefined) {
//     throw new Error('useUserProfile must be used within a UserProfileProvider')
//   }
//   return {
//     userProfile: context.userProfile,
//     setUserProfile: context.setUserProfile,
//     isLoading: context.isLoading,
//   }
// }
