import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../index.css'

export const Route = createRootRoute({
  component: () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    if (!googleClientId) {
      console.error('Google Client ID não configurado')
    }

    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  },
})
