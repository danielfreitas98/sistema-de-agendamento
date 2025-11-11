# Como Criar a Tabela appointments no Supabase

## 📋 Passo a Passo

### 1. Acesse o Supabase Dashboard
1. Vá para https://supabase.com
2. Faça login na sua conta
3. Selecione seu projeto: `khkuhzmszdwxyhnyeiup`

### 2. Abra o SQL Editor
1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"** (Nova consulta)

### 3. Execute o SQL
1. Abra o arquivo `supabase_schema.sql` que está na raiz do projeto `frontend`
2. Copie todo o conteúdo do arquivo
3. Cole no SQL Editor do Supabase
4. Clique em **"Run"** (Executar) ou pressione `Ctrl+Enter`

### 4. Verifique se a Tabela foi Criada
1. No menu lateral, clique em **"Table Editor"**
2. Você deve ver a tabela `appointments` na lista
3. Clique nela para ver a estrutura

## 🔐 Políticas de Segurança (RLS)

O SQL inclui Row Level Security (RLS) configurado para:
- Usuários autenticados podem ver apenas seus próprios agendamentos
- Usuários autenticados podem criar, atualizar e deletar apenas seus próprios agendamentos

**Se você quiser acesso público (sem autenticação):**
- Descomente as últimas linhas do arquivo `supabase_schema.sql`
- Execute novamente no SQL Editor

## ✅ Após Criar a Tabela

1. Recarregue a página do seu aplicativo (`localhost:5173`)
2. O teste de conexão deve mostrar: **"✅ Conexão com Supabase estabelecida com sucesso!"**

## 📝 Estrutura da Tabela

A tabela `appointments` terá os seguintes campos:
- `id` - UUID (chave primária)
- `created_at` - Timestamp de criação
- `start_time` - Data/hora de início do agendamento
- `end_time` - Data/hora de término do agendamento
- `client_name` - Nome do cliente
- `client_email` - Email do cliente
- `client_phone` - Telefone do cliente
- `service_type` - Tipo de serviço
- `notes` - Observações
- `status` - Status do agendamento (scheduled, completed, cancelled)
- `user_id` - ID do usuário (referência à tabela auth.users)

