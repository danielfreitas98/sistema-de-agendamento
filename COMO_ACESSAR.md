# 🚀 Como Acessar a Aplicação no Navegador

## Pré-requisitos

Você precisa ter o **Node.js** e **npm** instalados no seu computador.

### Verificar se já tem instalado:

Abra o PowerShell ou Terminal e execute:
```bash
node --version
npm --version
```

Se aparecer números de versão, está instalado! ✅

Se não aparecer nada ou der erro, você precisa instalar:
- Baixe em: https://nodejs.org/
- Instale a versão LTS (recomendada)

---

## 📋 Passo a Passo para Acessar

### 1. Abrir o Terminal/PowerShell

### 2. Navegar até a pasta do projeto:
```bash
cd "C:\Users\DANIEL FREITAS\Documents\Projetos_cursor1\Sistema de Agendamento\frontend"
```

### 3. Instalar as dependências (só precisa fazer uma vez):
```bash
npm install
```

**Nota:** Se der erro de política de execução no PowerShell, execute primeiro:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

### 5. Abrir no navegador:

Após executar `npm run dev`, você verá algo como:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Acesse:** `http://localhost:5173/` no seu navegador! 🌐

---

## 🔗 Rotas Disponíveis

- **Home:** `http://localhost:5173/` - Página inicial
- **Login:** `http://localhost:5173/login` - Página de login (necessário para acessar agendamentos)
- **Registro:** `http://localhost:5173/register` - Criar nova conta
- **Agendamentos:** `http://localhost:5173/appointments` - ⚠️ **Requer autenticação**
- **Área do Profissional:** `http://localhost:5173/professional`
- **Configuração do Banco:** `http://localhost:5173/config`

## 🔐 Como Fazer Login e Acessar os Agendamentos

### Primeira Vez (Criar Conta):

1. **Acesse a página inicial:** `http://localhost:5173/`
2. **Clique em "Criar Conta"** ou acesse diretamente: `http://localhost:5173/register`
3. **Preencha o formulário:**
   - Email (ex: `seuemail@exemplo.com`)
   - Senha (mínimo 6 caracteres)
   - Confirme a senha
4. **Clique em "Criar conta"**
5. Você será redirecionado automaticamente para a página de agendamentos

### Próximas Vezes (Fazer Login):

1. **Acesse a página inicial:** `http://localhost:5173/`
2. **Clique em "Fazer Login"** ou acesse diretamente: `http://localhost:5173/login`
3. **Digite suas credenciais:**
   - Email
   - Senha
4. **Clique em "Entrar"**
5. Você será redirecionado para a página de agendamentos

### ⚠️ Importante sobre Autenticação:

- A página de **Agendamentos** (`/appointments`) agora **requer login**
- Se você tentar acessar sem estar logado, será redirecionado para a página de login
- Após fazer login, você pode:
  - Ver seus agendamentos
  - Criar novos agendamentos
  - Editar seus agendamentos
  - Excluir seus agendamentos
  - Fazer logout (botão "Sair" no canto superior direito)

---

## ⚠️ Importante

- O servidor precisa estar rodando (`npm run dev`) para acessar a aplicação
- Para parar o servidor, pressione `Ctrl + C` no terminal
- Toda vez que você fechar o terminal, precisa rodar `npm run dev` novamente

---

## 🛠️ Comandos Úteis

- `npm install` - Instala as dependências (só precisa fazer uma vez)
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria uma versão de produção
- `npm run preview` - Visualiza a versão de produção

