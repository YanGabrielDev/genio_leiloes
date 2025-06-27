// store/userStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProfileData } from '@/features/auth/services/auth/auth.types'

type State = {
  userProfile: ProfileData | null
  setUserProfile: (data: ProfileData | null) => void
}

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      userProfile: null,
      setUserProfile: (data) => set({ userProfile: data }),
    }),
    {
      name: 'user', // nome no localStorage
    }
  )
)
