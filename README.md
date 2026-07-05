# 💰 Finance API - API de Gestão Financeira

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)]()

</div>

## 📖 Sobre o Projeto

API RESTful profissional para gestão financeira, desenvolvida como demonstração de **Clean Architecture**, **Princípios SOLID** e as melhores práticas de desenvolvimento de software. Este projeto foi criado para showcase de habilidades em arquitetura de software, TypeScript e desenvolvimento backend escalável.

### ✨ Destaques

- ✅ **Clean Architecture** com separação clara de responsabilidades
- ✅ **Todos os 5 princípios SOLID** aplicados na prática
- ✅ **100% TypeScript** com tipagem estrita
- ✅ **Testes automatizados** com Jest (18 testes unitários)
- ✅ **Validação robusta** com Zod
- ✅ **Error handling centralizado**
- ✅ **Docker-ready** com Docker Compose
- ✅ **Documentação completa**

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web minimalista
- **Prisma** - ORM moderno para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Jest** - Framework de testes
- **Zod** - Validação de schemas

## 🏗️ Arquitetura

Este projeto implementa **Clean Architecture** com separação clara de responsabilidades:

```
src/
├── modules/              # Módulos de domínio
│   └── transactions/     # Módulo de transações
│       ├── controller.ts # Camada de apresentação (HTTP)
│       ├── service.ts    # Camada de lógica de negócio
│       ├── repository.ts # Camada de acesso a dados
│       ├── routes.ts     # Definição de rotas
│       └── __tests__/    # Testes unitários
├── shared/               # Código compartilhado
│   ├── database/         # Configuração do banco
│   ├── errors/           # Classes de erro customizadas
│   ├── interfaces/       # Contratos e interfaces
│   └── middlewares/      # Middlewares Express
└── server.ts             # Ponto de entrada da aplicação
```

## 📋 Princípios SOLID Aplicados

### **S** - Single Responsibility Principle (SRP)
- Cada classe tem uma única responsabilidade
- `Controller`: Lida apenas com requisições HTTP
- `Service`: Contém apenas lógica de negócio
- `Repository`: Gerencia apenas acesso a dados

### **O** - Open/Closed Principle (OCP)
- Middleware de validação extensível via schemas Zod
- Fácil adição de novos módulos sem modificar código existente

### **L** - Liskov Substitution Principle (LSP)
- Todas as implementações seguem contratos de interfaces
- Substituição de implementações sem quebrar funcionalidade

### **I** - Interface Segregation Principle (ISP)
- Interfaces pequenas e específicas (`IController`, `IService`, `IRepository`)
- Nenhuma classe é forçada a implementar métodos não utilizados

### **D** - Dependency Inversion Principle (DIP)
- Dependências injetadas via construtor
- Módulos de alto nível não dependem de módulos de baixo nível
- Ambos dependem de abstrações (interfaces)

## 🛠️ Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Diogopbr/finance-api.git
cd finance-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_db?schema=public"
PORT=3000
NODE_ENV=development
```

4. **Execute as migrações do Prisma**
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. **Inicie o servidor**
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start
```

## 📡 API Endpoints

### Transações

#### Criar transação
```http
POST /api/transactions
Content-Type: application/json

{
  "description": "Salário",
  "amount": 5000,
  "type": "income",
  "category": "Trabalho",
  "date": "2024-01-15T10:00:00Z" // Opcional
}
```

#### Listar transações
```http
GET /api/transactions
GET /api/transactions?type=income
GET /api/transactions?category=Trabalho
GET /api/transactions?startDate=2024-01-01T00:00:00Z&endDate=2024-12-31T23:59:59Z
```

#### Buscar transação por ID
```http
GET /api/transactions/:id
```

#### Atualizar transação
```http
PUT /api/transactions/:id
Content-Type: application/json

{
  "description": "Novo título",
  "amount": 6000
}
```

#### Deletar transação
```http
DELETE /api/transactions/:id
```

#### Resumo financeiro
```http
GET /api/transactions/summary
GET /api/transactions/summary?type=income
```

Resposta:
```json
{
  "status": "success",
  "data": {
    "totalIncome": 10000,
    "totalExpense": 3000,
    "balance": 7000
  }
}
```

### Health Check
```http
GET /health
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

### Cobertura de Testes

- ✅ Testes unitários do Service
- ✅ Testes de integração do Controller
- ✅ Testes das classes de erro
- ✅ Validação de schemas

## 📊 Banco de Dados

### Schema Prisma

```prisma
model Transaction {
  id          String   @id @default(uuid())
  description String
  amount      Float
  type        String   // 'income' ou 'expense'
  category    String
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Comandos úteis do Prisma

```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar e aplicar migração
npm run prisma:migrate

# Abrir Prisma Studio (interface visual)
npm run prisma:studio
```

## 🔒 Validação de Dados

Utiliza **Zod** para validação robusta de schemas:

- Validação de tipos de dados
- Validação de formato (UUID, datetime, etc.)
- Validação de tamanho mínimo/máximo
- Mensagens de erro customizadas
- Type-safety garantido pelo TypeScript

## 🎯 Padrões de Design

- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Injeção de dependências via construtor
- **Singleton Pattern**: Instância única do Prisma Client
- **Factory Pattern**: Criação de instâncias nas rotas

## 📝 Exemplo de Uso

```typescript
// Criar uma receita
const income = await fetch('http://localhost:3000/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Freelance',
    amount: 2500,
    type: 'income',
    category: 'Trabalho'
  })
});

// Criar uma despesa
const expense = await fetch('http://localhost:3000/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    description: 'Supermercado',
    amount: 350,
    type: 'expense',
    category: 'Alimentação'
  })
});

// Obter resumo
const summary = await fetch('http://localhost:3000/api/transactions/summary');
```

## 🚀 Deploy

### Opções de Deploy

Este projeto pode ser deployado em diversas plataformas:

#### Railway (Recomendado) 🚂
- PostgreSQL incluído
- Sem cold starts
- Deploy automático via Git
- [Guia completo em DEPLOYMENT.md](DEPLOYMENT.md)

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

#### Vercel ⚡
- Serverless functions
- Deploy rápido
- Requer PostgreSQL externo
- [Configuração em DEPLOYMENT.md](DEPLOYMENT.md)

```bash
vercel
```

#### Outras Opções
- Render
- Fly.io
- Heroku
- DigitalOcean App Platform

### Variáveis de Ambiente para Produção

- `DATABASE_URL`: String de conexão PostgreSQL
- `NODE_ENV`: production
- `PORT`: 3000 (ou definido pelo host)

**Consulte [DEPLOYMENT.md](DEPLOYMENT.md) para guia completo de deploy.**

## 📈 Melhorias Futuras

- [ ] Autenticação e autorização (JWT)
- [ ] Paginação nas listagens
- [ ] Cache com Redis
- [ ] Rate limiting
- [ ] Documentação com Swagger/OpenAPI
- [ ] Logs estruturados (Winston/Pino)
- [ ] Métricas e observabilidade
- [ ] CI/CD pipeline

## 🚀 Deploy

### Railway (Recomendado)

Railway oferece PostgreSQL gratuito e deploy simplificado:

```bash
npm i -g @railway/cli
railway login
railway init
railway add  # Adicionar PostgreSQL
railway up
```

Configure as variáveis de ambiente no dashboard e execute as migrations:
```bash
railway run npm run prisma:migrate
```

### Vercel

Para deploy na Vercel, você precisará de um PostgreSQL externo (Supabase, Neon, etc):

```bash
npm i -g vercel
vercel login
vercel
```

Configure `DATABASE_URL` nas variáveis de ambiente.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Se você tem sugestões para melhorar este projeto:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto de portfólio para demonstração de habilidades em:
- Arquitetura de Software (Clean Architecture)
- Princípios SOLID
- TypeScript & Node.js
- Testes Automatizados
- Desenvolvimento Backend Escalável

---

<div align="center">

**Desenvolvido com ❤️, TypeScript e Clean Architecture**

Se este projeto foi útil, considere dar uma ⭐!

</div>
