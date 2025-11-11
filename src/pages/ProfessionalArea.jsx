import { useState, useEffect } from 'react'
import { useAppointments } from '../hooks/useAppointments'
import { Link } from 'react-router-dom'

function ProfessionalArea() {
  const { appointments, loading, error, fetchAppointments } = useAppointments()
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [activeFilter, setActiveFilter] = useState(null) // 'total' | 'today' | null
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [appointments, activeFilter, dateFilter])

  const applyFilters = () => {
    let filtered = [...appointments]

    // Aplicar filtro de data se houver
    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filterDate.setHours(0, 0, 0, 0)
      
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.start_time)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate.getTime() === filterDate.getTime()
      })
    }

    // Aplicar filtro baseado no clique nos cards
    if (activeFilter === 'today') {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      filtered = filtered.filter(apt => {
        const aptDate = new Date(apt.start_time)
        aptDate.setHours(0, 0, 0, 0)
        return aptDate.getTime() === today.getTime()
      })
    }

    setFilteredAppointments(filtered)
  }

  const getTotalAppointments = () => {
    return appointments.length
  }

  const getTodayAppointments = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.start_time)
      aptDate.setHours(0, 0, 0, 0)
      return aptDate.getTime() === today.getTime()
    }).length
  }

  const handleCardClick = (filterType) => {
    if (activeFilter === filterType) {
      // Se já está ativo, desativa o filtro
      setActiveFilter(null)
      setDateFilter('')
    } else {
      // Ativa o filtro
      setActiveFilter(filterType)
      if (filterType === 'today') {
        const today = new Date().toISOString().split('T')[0]
        setDateFilter(today)
      } else {
        setDateFilter('')
      }
    }
  }

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value)
    setActiveFilter(null) // Remove filtro de card quando filtra por data manualmente
  }

  const clearFilters = () => {
    setActiveFilter(null)
    setDateFilter('')
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'scheduled':
        return 'Agendado'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Voltar para Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">👨‍⚕️ Área do Profissional</h1>
          <p className="text-gray-600 mt-2">Gerencie e visualize seus agendamentos</p>
        </div>

        {/* Statistics Cards - Separados e Clicáveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Grid 1: Total de Agendamentos */}
          <div
            onClick={() => handleCardClick('total')}
            className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl border-2 ${
              activeFilter === 'total' 
                ? 'ring-4 ring-blue-500 border-blue-500 shadow-2xl scale-105' 
                : 'border-blue-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  Total de Agendamentos
                </p>
                <p className="text-5xl font-bold text-blue-900">{getTotalAppointments()}</p>
                <p className="text-xs text-blue-600 mt-2">
                  Clique para filtrar todos os agendamentos
                </p>
              </div>
              <div className="text-blue-500 text-6xl opacity-80">📅</div>
            </div>
            {activeFilter === 'total' && (
              <div className="mt-4 pt-4 border-t-2 border-blue-300 bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-lg">✓</span>
                  <p className="text-sm text-blue-800 font-semibold">
                    Filtro ativo - Mostrando todos os {filteredAppointments.length} agendamento(s)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grid 2: Agendamentos Hoje */}
          <div
            onClick={() => handleCardClick('today')}
            className={`bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl border-2 ${
              activeFilter === 'today' 
                ? 'ring-4 ring-green-500 border-green-500 shadow-2xl scale-105' 
                : 'border-green-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                  Agendamentos Hoje
                </p>
                <p className="text-5xl font-bold text-green-900">{getTodayAppointments()}</p>
                <p className="text-xs text-green-600 mt-2">
                  Clique para filtrar apenas os de hoje
                </p>
              </div>
              <div className="text-green-500 text-6xl opacity-80">📆</div>
            </div>
            {activeFilter === 'today' && (
              <div className="mt-4 pt-4 border-t-2 border-green-300 bg-green-50 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <p className="text-sm text-green-800 font-semibold">
                    Filtro ativo - Mostrando {filteredAppointments.length} agendamento(s) de hoje
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por data:
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={handleDateFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {(activeFilter || dateFilter) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
          {(activeFilter || dateFilter) && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Filtro ativo:</strong> {activeFilter === 'today' ? 'Agendamentos de hoje' : activeFilter === 'total' ? 'Todos os agendamentos' : dateFilter ? `Data: ${new Date(dateFilter).toLocaleDateString('pt-BR')}` : ''}
                {' '}({filteredAppointments.length} resultado{filteredAppointments.length !== 1 ? 's' : ''})
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Erro:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600">Carregando agendamentos...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">
              {activeFilter || dateFilter 
                ? 'Nenhum agendamento encontrado com os filtros aplicados.' 
                : 'Nenhum agendamento encontrado.'}
            </p>
            {(activeFilter || dateFilter) && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Lista de Agendamentos {activeFilter || dateFilter ? `(${filteredAppointments.length})` : ''}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data/Hora Início
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data/Hora Término
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Observações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.client_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {appointment.client_email && (
                            <div>{appointment.client_email}</div>
                          )}
                          {appointment.client_phone && (
                            <div>{appointment.client_phone}</div>
                          )}
                          {!appointment.client_email && !appointment.client_phone && (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.service_type || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(appointment.start_time)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(appointment.end_time)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusLabel(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {appointment.notes || '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfessionalArea

