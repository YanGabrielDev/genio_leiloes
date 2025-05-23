import { LoginForm } from '@/features/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <main className="grid grid-cols-12 h-full w-full">
    <div className="relative col-span-12 md:col-span-4 h-screen bg-blue-100 flex justify-center items-center p-8">
      <LoginForm />
    </div>
    <div className="sm:hidden md:block col-span-8 h-screen bg-white p-8">
      {/* <img
        src={loginText}
        className="w-full h-1/5"
        alt='Logo escrito venha estudar' />
      <img
        src={walppaper}
        className="w-full h-4/5"
        alt='Garotos estudando em uma mesa' /> */}
    </div>
  </main>
  )
}
