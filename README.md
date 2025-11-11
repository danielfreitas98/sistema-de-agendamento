# Sistema de Agendamento - Frontend

## ✅ Configuração do Supabase

O arquivo `.env` já está configurado com suas credenciais do Supabase:
- URL: `https://khkuhzmszdwxyhnyeiup.supabase.co`
- ANON KEY: Configurada

## 🚀 Como Instalar e Executar

### 1. Instalar Dependências

Abra o terminal na pasta `frontend` e execute:

```bash
npm install
```

**Nota:** Se você encontrar erro de política de execução do PowerShell, execute primeiro:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

### 3. Testar a Conexão

Após iniciar o servidor:
1. Acesse `http://localhost:5173` (ou a porta que o Vite indicar)
2. Na página inicial, você verá um componente de teste de conexão
3. Ele mostrará se a conexão com o Supabase está funcionando

## 📋 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── SupabaseConnectionTest.jsx
├── pages/              # Páginas/rotas
│   ├── Home.jsx
│   └── AppointmentsManager.jsx
├── services/           # Serviços (Supabase client)
│   └── supabaseClient.js
├── hooks/              # Custom hooks
│   └── useAppointments.js
├── context/            # Context API
│   └── AuthContext.js
└── App.jsx             # Componente principal com rotas
```

## 🔧 Próximos Passos

1. Criar a tabela `appointments` no Supabase
2. Configurar autenticação (se necessário)
3. Desenvolver os componentes de agendamento

## 📝 Variáveis de Ambiente

O arquivo `.env` contém:
- `VITE_SUPABASE_URL` - URL do seu projeto Supabase
- `VITE_SUPABASE_ANON_KEY` - Chave pública/anônima do Supabase

**Importante:** Nunca commite o arquivo `.env` no Git (já está no .gitignore)

