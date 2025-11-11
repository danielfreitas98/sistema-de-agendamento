import { Link } from 'react-router-dom'
import SupabaseConnectionTest from '../components/SupabaseConnectionTest'

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo ao Sistema de Agendamento</h1>
        <p className="text-gray-600 mb-6">Esta é a página inicial</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/appointments"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            Ir para Agendamentos
          </Link>
          <Link
            to="/professional"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            Área do Profissional
          </Link>
          <Link
            to="/config"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
          >
            Configuração do Banco
          </Link>
        </div>
      </div>
      <SupabaseConnectionTest />
    </div>
  )
}

export default Home

