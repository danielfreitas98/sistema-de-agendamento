import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { Link } from 'react-router-dom'

function DatabaseConfig() {
  const [connectionStatus, setConnectionStatus] = useState('Verificando...')
  const [dbInfo, setDbInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // Testa a conexão
      const { data, error: testError } = await supabase
        .from('appointments')
        .select('count')
        .limit(1)

      if (testError) {
        if (testError.code === 'PGRST116' || testError.message?.includes('schema cache')) {
          setConnectionStatus('⚠️ Conectado - Tabela não encontrada')
          setError('A tabela "appointments" precisa ser criada. Veja as instruções abaixo.')
        } else {
          throw testError
        }
      } else {
        setConnectionStatus('✅ Conectado com sucesso')
        
        // Buscar informações sobre a tabela
        const { data: appointments, error: fetchError } = await supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })

        if (!fetchError) {
          setDbInfo({
            tableExists: true,
            recordCount: appointments?.length || 0
          })
        }
      }
    } catch (err) {
      setConnectionStatus('❌ Erro na conexão')
      setError(err.message)
    }
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  const hasUrl = !!supabaseUrl
  const hasKey = !!supabaseKey

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Voltar para Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Configuração do Banco de Dados</h1>
          <p className="text-gray-600 mt-2">Informações sobre variáveis de ambiente e conexão com Supabase</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status da Conexão</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Status:</span>
              <span className={`font-semibold ${
                connectionStatus.includes('✅') ? 'text-green-600' :
                connectionStatus.includes('⚠️') ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {connectionStatus}
              </span>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            {dbInfo && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Tabela appointments:</strong> {dbInfo.tableExists ? '✅ Existe' : '❌ Não encontrada'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Variables Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Variáveis de Ambiente</h2>
          
          <div className="space-y-4">
            {/* VITE_SUPABASE_URL */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  VITE_SUPABASE_URL
                </label>
                {hasUrl ? (
                  <span className="text-green-600 text-sm font-semibold">✅ Configurada</span>
                ) : (
                  <span className="text-red-600 text-sm font-semibold">❌ Não configurada</span>
                )}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <code className="text-sm text-gray-800 break-all">
                  {supabaseUrl || 'Não definida'}
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                URL do seu projeto Supabase (ex: https://seu-projeto.supabase.co)
              </p>
            </div>

            {/* VITE_SUPABASE_ANON_KEY */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  VITE_SUPABASE_ANON_KEY
                </label>
                {hasKey ? (
                  <span className="text-green-600 text-sm font-semibold">✅ Configurada</span>
                ) : (
                  <span className="text-red-600 text-sm font-semibold">❌ Não configurada</span>
                )}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <code className="text-sm text-gray-800 break-all">
                  {hasKey ? `${supabaseKey.substring(0, 30)}...` : 'Não definida'}
                </code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Chave pública/anônima do Supabase (anon/public key)
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Como Configurar</h2>
          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">1. Localizar o arquivo .env</h3>
              <p className="ml-4">
                O arquivo <code className="bg-blue-100 px-1 rounded">.env</code> deve estar na raiz do projeto <code className="bg-blue-100 px-1 rounded">frontend/</code>
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Formato do arquivo .env</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded mt-2 ml-4 font-mono text-xs overflow-x-auto">
                <div>VITE_SUPABASE_URL=https://seu-projeto.supabase.co</div>
                <div>VITE_SUPABASE_ANON_KEY=sua-chave-anon-key-aqui</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Onde encontrar as credenciais</h3>
              <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Acesse <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a> e faça login</li>
                <li>Selecione seu projeto</li>
                <li>Vá em <strong>Settings</strong> → <strong>API</strong></li>
                <li>Copie a <strong>Project URL</strong> (VITE_SUPABASE_URL)</li>
                <li>Copie a <strong>anon/public key</strong> (VITE_SUPABASE_ANON_KEY)</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Após configurar</h3>
              <p className="ml-4">
                Reinicie o servidor de desenvolvimento (<code className="bg-blue-100 px-1 rounded">npm run dev</code>) para que as variáveis sejam carregadas.
              </p>
            </div>
          </div>
        </div>

        {/* Database Schema Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Estrutura do Banco de Dados</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Tabela: appointments</h3>
              <div className="bg-gray-50 border border-gray-200 rounded p-4 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Campo</th>
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Tipo</th>
                      <th className="text-left py-2 px-2 font-semibold text-gray-700">Descrição</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">id</code></td>
                      <td className="py-2 px-2">UUID</td>
                      <td className="py-2 px-2">Chave primária</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">client_name</code></td>
                      <td className="py-2 px-2">VARCHAR(255)</td>
                      <td className="py-2 px-2">Nome do cliente</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">client_email</code></td>
                      <td className="py-2 px-2">VARCHAR(255)</td>
                      <td className="py-2 px-2">Email do cliente</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">client_phone</code></td>
                      <td className="py-2 px-2">VARCHAR(50)</td>
                      <td className="py-2 px-2">Telefone do cliente</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">service_type</code></td>
                      <td className="py-2 px-2">VARCHAR(255)</td>
                      <td className="py-2 px-2">Tipo de serviço</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">start_time</code></td>
                      <td className="py-2 px-2">TIMESTAMP</td>
                      <td className="py-2 px-2">Data/hora de início</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">end_time</code></td>
                      <td className="py-2 px-2">TIMESTAMP</td>
                      <td className="py-2 px-2">Data/hora de término</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">status</code></td>
                      <td className="py-2 px-2">VARCHAR(50)</td>
                      <td className="py-2 px-2">Status (scheduled, completed, cancelled)</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">notes</code></td>
                      <td className="py-2 px-2">TEXT</td>
                      <td className="py-2 px-2">Observações</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2"><code className="bg-gray-200 px-1 rounded">created_at</code></td>
                      <td className="py-2 px-2">TIMESTAMP</td>
                      <td className="py-2 px-2">Data de criação</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/appointments"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Gerenciar Agendamentos
            </Link>
            <button
              onClick={checkConnection}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Testar Conexão Novamente
            </button>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
            >
              Abrir Supabase Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatabaseConfig

