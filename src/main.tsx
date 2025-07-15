import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Elements } from '@stripe/react-stripe-js'
import { VehicleFilterProvider } from './context/vehicle-filter.context'
import { Toaster } from './components/ui/toaster'
import { stripePromise } from '@/stripe'
import { HelmetProvider } from 'react-helmet-async'

// Create a new router instance
const router = createRouter({ routeTree })
const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!googleClientId) {
  console.error('Google Client ID não configurado')
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <Elements stripe={stripePromise}>
            <VehicleFilterProvider>
              <Toaster />
              <HelmetProvider>
                <RouterProvider router={router} />
              </HelmetProvider>
            </VehicleFilterProvider>
          </Elements>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  )
}
