# Foco Total

Foco Total é um aplicativo backend focado em **gerenciamento de tarefas (tasks)**.  
Ele permite criar contas, fazer login com JWT, cadastrar tarefas, editar, listar e excluir — oferecendo uma base sólida para um sistema completo de produtividade.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Prisma ORM**
- **JWT (JSON Web Tokens)**
- **React-Hook-Form**
- **TanStack Query**
- **Axios**
- **Banco de dados relacional** (definido no `schema.prisma`)

---

## 📦 Como Rodar o Projeto

Siga o passo a passo para configurar e executar o projeto no ambiente local:

```bash

cp .env.template .env

# Gere sua chave e atualize o .env
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Instale as dependências
npm install

# Agora só rodar
npm run dev

# (opicional) caso queira resetar o banco:
npx prisma migrate reset
npx prisma migrate dev
