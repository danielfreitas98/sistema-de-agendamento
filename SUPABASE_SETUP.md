# Como obter suas credenciais do Supabase:

1. Acesse https://supabase.com e faça login na sua conta
2. Selecione seu projeto (ou crie um novo se necessário)
3. No menu lateral, clique em "Settings" (Configurações)
4. Clique em "API" no submenu
5. Você encontrará:
   - Project URL: Esta é sua VITE_SUPABASE_URL
   - anon/public key: Esta é sua VITE_SUPABASE_ANON_KEY

# Depois de obter as credenciais:
1. Copie o arquivo .env.example para .env
2. Substitua os valores placeholder pelas suas credenciais reais
3. Salve o arquivo .env na raiz do projeto frontend

# IMPORTANTE:
- Nunca commite o arquivo .env no Git (ele já está no .gitignore)
- Use apenas o .env.example como referência

