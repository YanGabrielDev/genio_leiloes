import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'
import { Toaster } from '@/components/ui/toaster'
import { UserProfileProvider } from '@/context/user-profile.context'
import { VehicleFilterProvider } from '@/context/vehicle-filter.context'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/stripe'

export const Route = createRootRoute({
  component: () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    if (!googleClientId) {
      console.error('Google Client ID não configurado')
    }

    return (
      <UserProfileProvider>
        <GoogleOAuthProvider clientId={googleClientId}>
          <Elements stripe={stripePromise}>
            <VehicleFilterProvider>
              <Toaster />
              <Outlet />
              {import.meta.env.DEV && (
                <TanStackRouterDevtools position="bottom-right" />
              )}
            </VehicleFilterProvider>
          </Elements>
        </GoogleOAuthProvider>
      </UserProfileProvider>
    )
  },
})
