import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'
import { Toaster } from '@/components/ui/toaster'
import { UserProfileProvider } from '@/context/user-profile.context'
import { VehicleFilterProvider } from '@/context/vehicle-filter.context'

export const Route = createRootRoute({
  component: () => (
    <>
   <UserProfileProvider>
    <VehicleFilterProvider>
    <Toaster />
      <Outlet />
      <TanStackRouterDevtools />
    </VehicleFilterProvider>
      </UserProfileProvider>

    </>
  ),
})
