import { useState } from 'react'
import { supabase } from '../services/supabaseClient'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Obter o usuário atual autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        // Se o erro for relacionado à sessão, fornecer mensagem mais clara
        if (userError.message?.includes('session') || userError.message?.includes('Auth session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw userError
      }
      
      if (!user) {
        setAppointments([])
        setLoading(false)
        return
      }
      
      // Buscar apenas os agendamentos do usuário atual
      const { data, error: fetchError } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true })
      
      if (fetchError) {
        // Melhorar mensagens de erro do Supabase
        if (fetchError.message?.includes('JWT') || fetchError.message?.includes('session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw fetchError
      }
      
      setAppointments(data || [])
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const addAppointment = async (newAppointment) => {
    setError(null)
    
    try {
      // Obter o usuário atual autenticado
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        if (userError.message?.includes('session') || userError.message?.includes('Auth session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw userError
      }
      
      if (!user) {
        throw new Error('Você precisa estar autenticado para criar agendamentos')
      }
      
      // Incluir o user_id no agendamento
      const appointmentWithUserId = {
        ...newAppointment,
        user_id: user.id
      }
      
      const { data, error: insertError } = await supabase
        .from('appointments')
        .insert([appointmentWithUserId])
        .select()
      
      if (insertError) {
        if (insertError.message?.includes('JWT') || insertError.message?.includes('session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw insertError
      }
      
      // Atualizar a lista de agendamentos após inserção bem-sucedida
      await fetchAppointments()
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateAppointment = async (id, updatedData) => {
    setError(null)
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        if (userError.message?.includes('session') || userError.message?.includes('Auth session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw userError
      }

      const { data, error: updateError } = await supabase
        .from('appointments')
        .update(updatedData)
        .eq('id', id)
        .select()
      
      if (updateError) {
        if (updateError.message?.includes('JWT') || updateError.message?.includes('session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw updateError
      }
      
      // Atualizar a lista de agendamentos após atualização bem-sucedida
      await fetchAppointments()
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteAppointment = async (id) => {
    setError(null)
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError) {
        if (userError.message?.includes('session') || userError.message?.includes('Auth session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw userError
      }

      const { error: deleteError } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)
      
      if (deleteError) {
        if (deleteError.message?.includes('JWT') || deleteError.message?.includes('session')) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.')
        }
        throw deleteError
      }
      
      // Atualizar a lista de agendamentos após exclusão bem-sucedida
      await fetchAppointments()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
  }
}

