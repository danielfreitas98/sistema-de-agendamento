# 📝 Como Inserir Dados Fictícios de Teste

## ⚠️ Importante

**Criar dados fictícios no banco NÃO resolve o problema de RLS automaticamente!**

O erro "new row violates row-level security policy" acontece porque:
- As políticas RLS exigem que você esteja autenticado
- O `user_id` precisa corresponder ao usuário autenticado

## 🎯 Solução Recomendada: Tornar o Sistema Público

Se você quer testar rapidamente sem precisar de autenticação, use a **OPÇÃO 2** do script.

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - Vá para https://supabase.com
   - Faça login e selecione seu projeto

2. **Abra o SQL Editor**
   - No menu lateral, clique em **"SQL Editor"**
   - Clique em **"New query"**

3. **Execute o Script**
   - Abra o arquivo `inserir_dados_teste.sql`
   - **Descomente apenas a OPÇÃO 2** (remova os `--` do início das linhas da seção OPÇÃO 2)
   - Copie e cole no SQL Editor
   - Clique em **"Run"** ou pressione `Ctrl+Enter`

4. **Verifique os Dados**
   - No menu lateral, clique em **"Table Editor"**
   - Selecione a tabela `appointments`
   - Você deve ver os dados fictícios inseridos

## 🔐 Alternativa: Usar Autenticação

Se você preferir manter a segurança com autenticação:

1. **Criar um Usuário de Teste**
   - Na aplicação, vá para a página de registro/login
   - Crie uma conta de teste (ex: `teste@email.com` / `senha123`)

2. **Obter o ID do Usuário**
   - No Supabase Dashboard, vá em **"Authentication"** > **"Users"**
   - Copie o ID do usuário criado

3. **Usar a OPÇÃO 1 do Script**
   - Abra `inserir_dados_teste.sql`
   - Descomente a **OPÇÃO 1**
   - Substitua `'SEU_USER_ID_AQUI'` pelo ID real do usuário
   - Execute no SQL Editor

## ✅ Após Inserir os Dados

1. Recarregue a aplicação (`http://localhost:5173`)
2. Vá para a página de Agendamentos (`/appointments`)
3. Você deve ver os dados fictícios listados

## 🔄 Reverter para Políticas Restritivas

Se você usou a OPÇÃO 2 (sistema público) e quer voltar para políticas restritivas:

Execute este SQL no Supabase:

```sql
-- Remover políticas públicas
DROP POLICY IF EXISTS "Enable read access for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable update access for all users" ON public.appointments;
DROP POLICY IF EXISTS "Enable delete access for all users" ON public.appointments;

-- Recriar políticas restritivas
CREATE POLICY "Users can view their own appointments"
    ON public.appointments
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments"
    ON public.appointments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments"
    ON public.appointments
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appointments"
    ON public.appointments
    FOR DELETE
    USING (auth.uid() = user_id);
```

## 📊 Dados que Serão Inseridos

O script cria 8 agendamentos fictícios com:
- Nomes de clientes variados
- Emails e telefones de exemplo
- Diferentes tipos de serviços
- Status variados (scheduled, completed, cancelled)
- Datas distribuídas ao longo de alguns dias

