import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testando...')
  const [error, setError] = useState(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Testa a conexão fazendo uma consulta simples
        const { data, error: testError } = await supabase
          .from('appointments')
          .select('count')
          .limit(1)

        if (testError) {
          // Se a tabela não existir, ainda podemos testar a conexão básica
          if (testError.code === 'PGRST116' || testError.message?.includes('schema cache')) {
            setConnectionStatus('✅ Conexão com Supabase estabelecida! ⚠️ Tabela appointments ainda não existe')
            setError('A tabela "appointments" precisa ser criada no Supabase. Veja o arquivo supabase_schema.sql para o SQL necessário.')
          } else {
            throw testError
          }
        } else {
          setConnectionStatus('✅ Conexão com Supabase estabelecida com sucesso!')
        }
      } catch (err) {
        setError(err.message)
        setConnectionStatus('❌ Erro na conexão com Supabase')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Teste de Conexão Supabase</h2>
      <div className="space-y-2">
        <p className="text-gray-700">{connectionStatus}</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Erro:</p>
            <p>{error}</p>
          </div>
        )}
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'Não configurada'}</p>
          <p><strong>Chave:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Não configurada'}</p>
        </div>
      </div>
    </div>
  )
}

export default SupabaseConnectionTest

