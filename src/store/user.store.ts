// store/userStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProfileData } from '@/features/auth/services/auth/auth.types'
import { ListSubscriptionsPlans } from '@/features/account/services/subscriptions/subscriptions.types'

type State = {
  userProfile: ProfileData | null
  setUserProfile: (data: ProfileData | null) => void
  plan: ListSubscriptionsPlans | null
  setUserPlan: (data: ListSubscriptionsPlans | null) => void
}

export const useUserStore = create<State>()(
  persist(
    (set) => ({
      userProfile: null,
      plan: null,
      setUserProfile: (data) => set({ userProfile: data }),
      setUserPlan: (data) => set({ plan: data }),
    }),
    {
      name: 'user', // nome no localStorage
    }
  )
)
