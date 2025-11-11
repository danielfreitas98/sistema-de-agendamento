-- SQL para criar a tabela appointments no Supabase
-- Execute este SQL no SQL Editor do Supabase

CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255),
    client_phone VARCHAR(50),
    service_type VARCHAR(255),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON public.appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários vejam seus próprios agendamentos
CREATE POLICY "Users can view their own appointments"
    ON public.appointments
    FOR SELECT
    USING (auth.uid() = user_id);

-- Política para permitir que usuários criem seus próprios agendamentos
CREATE POLICY "Users can create their own appointments"
    ON public.appointments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Política para permitir que usuários atualizem seus próprios agendamentos
CREATE POLICY "Users can update their own appointments"
    ON public.appointments
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Política para permitir que usuários deletem seus próprios agendamentos
CREATE POLICY "Users can delete their own appointments"
    ON public.appointments
    FOR DELETE
    USING (auth.uid() = user_id);

-- Se você quiser permitir acesso público (sem autenticação), use estas políticas:
-- DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
-- DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
-- DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
-- DROP POLICY IF EXISTS "Users can delete their own appointments" ON public.appointments;

-- CREATE POLICY "Enable read access for all users" ON public.appointments FOR SELECT USING (true);
-- CREATE POLICY "Enable insert access for all users" ON public.appointments FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update access for all users" ON public.appointments FOR UPDATE USING (true);
-- CREATE POLICY "Enable delete access for all users" ON public.appointments FOR DELETE USING (true);

