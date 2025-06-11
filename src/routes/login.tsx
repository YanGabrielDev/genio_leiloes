import { createFileRoute } from '@tanstack/react-router'
import hero from '../assets/hero.png'
import { LoginForm } from '@/features/auth/components/LoginForm'
export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <main className="grid grid-cols-12 h-full w-full">
      <div className="relative col-span-12 md:col-span-4 h-screen bg-white flex justify-center items-center p-8">
        <LoginForm />
      </div>
      <div className="hidden md:block col-span-8 h-screen bg-primary p-8">
        <img
          src={hero}
          alt="um matelo e um carro de leilao"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </main>
  )
}
