-- ============================================
-- SCRIPT PARA INSERIR DADOS FICTÍCIOS DE TESTE
-- ============================================
-- Execute este SQL no SQL Editor do Supabase
--
-- IMPORTANTE: Este script tem 2 opções:
-- 1. Criar um usuário de teste e inserir dados associados a ele
-- 2. Tornar o sistema público (sem autenticação) e inserir dados

-- ============================================
-- OPÇÃO 1: CRIAR USUÁRIO DE TESTE E DADOS
-- ============================================
-- Descomente esta seção se quiser criar um usuário de teste

/*
-- Criar um usuário de teste (você precisará confirmar o email depois)
-- IMPORTANTE: Você precisa criar este usuário manualmente pelo Supabase Auth
-- ou usar a função de signup na aplicação primeiro
-- Depois, copie o ID do usuário criado e use no INSERT abaixo

-- Para obter o ID de um usuário existente, execute:
-- SELECT id, email FROM auth.users LIMIT 1;

-- Substitua 'SEU_USER_ID_AQUI' pelo ID real do usuário
INSERT INTO public.appointments (
    start_time,
    end_time,
    client_name,
    client_email,
    client_phone,
    service_type,
    notes,
    status,
    user_id
) VALUES
    (
        '2024-12-20 09:00:00+00',
        '2024-12-20 10:00:00+00',
        'João Silva',
        'joao.silva@email.com',
        '(11) 98765-4321',
        'Consulta Médica',
        'Primeira consulta do paciente',
        'scheduled',
        'SEU_USER_ID_AQUI'::uuid
    ),
    (
        '2024-12-20 14:00:00+00',
        '2024-12-20 15:30:00+00',
        'Maria Santos',
        'maria.santos@email.com',
        '(11) 91234-5678',
        'Exame de Sangue',
        'Jejum de 12 horas necessário',
        'scheduled',
        'SEU_USER_ID_AQUI'::uuid
    ),
    (
        '2024-12-21 10:00:00+00',
        '2024-12-21 11:00:00+00',
        'Pedro Oliveira',
        'pedro.oliveira@email.com',
        '(11) 99876-5432',
        'Consulta de Retorno',
        'Paciente em acompanhamento',
        'completed',
        'SEU_USER_ID_AQUI'::uuid
    ),
    (
        '2024-12-22 08:30:00+00',
        '2024-12-22 09:30:00+00',
        'Ana Costa',
        'ana.costa@email.com',
        '(11) 97654-3210',
        'Vacinação',
        'Dose de reforço',
        'scheduled',
        'SEU_USER_ID_AQUI'::uuid
    ),
    (
        '2024-12-23 13:00:00+00',
        '2024-12-23 14:00:00+00',
        'Carlos Mendes',
        'carlos.mendes@email.com',
        '(11) 92345-6789',
        'Consulta Geral',
        'Check-up anual',
        'scheduled',
        'SEU_USER_ID_AQUI'::uuid
    );
*/

-- ============================================
-- OPÇÃO 2: TORNAR SISTEMA PÚBLICO E INSERIR DADOS
-- ============================================
-- Descomente esta seção se quiser acesso público (sem autenticação)

-- Primeiro, remover políticas restritivas
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can delete their own appointments" ON public.appointments;

-- Criar políticas públicas (acesso sem autenticação)
CREATE POLICY "Enable read access for all users"
    ON public.appointments
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert access for all users"
    ON public.appointments
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
    ON public.appointments
    FOR UPDATE
    USING (true);

CREATE POLICY "Enable delete access for all users"
    ON public.appointments
    FOR DELETE
    USING (true);

-- Agora inserir dados fictícios (sem user_id, já que é público)
INSERT INTO public.appointments (
    start_time,
    end_time,
    client_name,
    client_email,
    client_phone,
    service_type,
    notes,
    status
) VALUES
    (
        '2024-12-20 09:00:00+00',
        '2024-12-20 10:00:00+00',
        'João Silva',
        'joao.silva@email.com',
        '(11) 98765-4321',
        'Consulta Médica',
        'Primeira consulta do paciente',
        'scheduled'
    ),
    (
        '2024-12-20 14:00:00+00',
        '2024-12-20 15:30:00+00',
        'Maria Santos',
        'maria.santos@email.com',
        '(11) 91234-5678',
        'Exame de Sangue',
        'Jejum de 12 horas necessário',
        'scheduled'
    ),
    (
        '2024-12-21 10:00:00+00',
        '2024-12-21 11:00:00+00',
        'Pedro Oliveira',
        'pedro.oliveira@email.com',
        '(11) 99876-5432',
        'Consulta de Retorno',
        'Paciente em acompanhamento',
        'completed'
    ),
    (
        '2024-12-22 08:30:00+00',
        '2024-12-22 09:30:00+00',
        'Ana Costa',
        'ana.costa@email.com',
        '(11) 97654-3210',
        'Vacinação',
        'Dose de reforço',
        'scheduled'
    ),
    (
        '2024-12-23 13:00:00+00',
        '2024-12-23 14:00:00+00',
        'Carlos Mendes',
        'carlos.mendes@email.com',
        '(11) 92345-6789',
        'Consulta Geral',
        'Check-up anual',
        'scheduled'
    ),
    (
        '2024-12-24 10:00:00+00',
        '2024-12-24 11:00:00+00',
        'Fernanda Lima',
        'fernanda.lima@email.com',
        '(11) 94567-8901',
        'Fisioterapia',
        'Sessão de reabilitação',
        'scheduled'
    ),
    (
        '2024-12-25 15:00:00+00',
        '2024-12-25 16:00:00+00',
        'Roberto Alves',
        'roberto.alves@email.com',
        '(11) 93456-7890',
        'Consulta Psicológica',
        'Acompanhamento semanal',
        'cancelled'
    ),
    (
        '2024-12-26 11:00:00+00',
        '2024-12-26 12:00:00+00',
        'Juliana Ferreira',
        'juliana.ferreira@email.com',
        '(11) 95678-9012',
        'Exame de Imagem',
        'Raio-X do tórax',
        'scheduled'
    );

-- Verificar se os dados foram inseridos
SELECT 
    id,
    client_name,
    client_email,
    service_type,
    start_time,
    status,
    created_at
FROM public.appointments
ORDER BY start_time;

