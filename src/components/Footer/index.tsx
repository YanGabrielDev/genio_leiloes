import { Instagram } from 'lucide-react'
import { Link } from '@tanstack/react-router'

const instagramUrl =
  'https://www.instagram.com/genioleilao?igsh=MWppNnhwNGxoY3kyNA=='

export function Footer() {
  return (
    <footer className="bg-primary text-white pb-36 0 sm:pb-0">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <img
                src="/genio.webp"
                alt="Gênio Leilão Logo"
                className="h-10 w-10 rounded-lg"
              />
              <h3 className="bg-gradient-to-r font-bold  from-purple-600 to-blue-600 bg-clip-text text-transparent  text-2xl ">
                Gênio Leilão
              </h3>
            </div>
            <p className="mt-4 text-sm text-white">
              Sua plataforma inteligente para arrematar os melhores veículos em
              leilão.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200">Navegação</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  search={{ city: undefined }}
                  className="text-white transition-colors hover:text-white"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="text-white transition-colors hover:text-white"
                >
                  Minha Conta
                </Link>
              </li>
              <li>
                <Link
                  to="/auction-alert"
                  className="text-white transition-colors hover:text-white"
                >
                  Meus Alertas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white transition-colors hover:text-white"
                >
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white transition-colors hover:text-white"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-200">Siga-nos</h4>
            <div className="mt-4 flex space-x-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 border-t border-t-white
         pt-8 text-center text-sm text-white"
        >
          <p>
            &copy; {new Date().getFullYear()} Gênio Leilão. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
