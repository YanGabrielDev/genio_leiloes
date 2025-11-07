import { Link } from '@tanstack/react-router'
import logo from '../../../public/genio_icon.png'

export const HeaderLogo = () => {
  return (
    <Link to="/" search={{ city: undefined }}>
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Gênio da lampada com um matelo na mão logo"
          className="h-12 w-12 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Gênio Leilão
          </h1>
          <p className="text-xs text-gray-500">Veículos do Detran</p>
        </div>
      </div>
    </Link>
  )
}
