import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Elements } from '@stripe/react-stripe-js'
import { VehicleFilterProvider } from './context/vehicle-filter.context'
import { Toaster } from './components/ui/toaster'
import { stripePromise } from '@/stripe'
import { HelmetProvider } from 'react-helmet-async'
import { TourProvider } from './context/tour.context'
import { LoginIncentiveModal } from './routes/LoginIncentiveModal'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!googleClientId) {
  console.error('Google Client ID não configurado')
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <TourProvider>
              <VehicleFilterProvider>
                <Toaster />
                <HelmetProvider>
                  <LoginIncentiveModal />
                  <RouterProvider router={router} />
                </HelmetProvider>
              </VehicleFilterProvider>
            </TourProvider>
          </Elements>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  )
}
