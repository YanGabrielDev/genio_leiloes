import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'
import { Toaster } from '@/components/ui/toaster'
import { UserProfileProvider } from '@/context/user-profile.context'
import { VehicleFilterProvider } from '@/context/vehicle-filter.context'
import { GoogleOAuthProvider } from '@react-oauth/google'

export const Route = createRootRoute({
  component: () => (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <UserProfileProvider>
          <VehicleFilterProvider>
            <Toaster />
            <Outlet />
            <TanStackRouterDevtools />
          </VehicleFilterProvider>
        </UserProfileProvider>
      </GoogleOAuthProvider>
    </>
  ),
})
