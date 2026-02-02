# ⚡ Comandos Rápidos - Finance API

## 🎯 Comandos Essenciais

### Instalação e Setup (JÁ FEITO ✅)
```bash
npm install                    # Dependências instaladas
npm run prisma:generate        # Prisma Client gerado
npm run build                  # Projeto compilado
```

### Banco de Dados

#### Opção 1: Docker (Mais Fácil) 🐳
```bash
# Iniciar PostgreSQL
docker-compose up -d

# Aguardar alguns segundos...
timeout 5

# Executar migrações
npm run prisma:migrate

# Ver dados no Prisma Studio
npm run prisma:studio
```

#### Opção 2: PostgreSQL Local
```bash
# 1. Instalar PostgreSQL
# 2. Criar banco de dados:
#    CREATE DATABASE finance_db;
# 3. Configurar .env com credenciais
# 4. Executar migrações:
npm run prisma:migrate
```

### Desenvolvimento 🚀
```bash
# Iniciar servidor (modo desenvolvimento)
npm run dev

# Servidor rodará em http://localhost:3000
```

### Produção 📦
```bash
# Compilar
npm run build

# Executar
npm start
```

### Testes 🧪
```bash
# Todos os testes
npm test

# Apenas testes unitários (sem banco)
npm test -- service.test.ts
npm test -- AppError.test.ts

# Com coverage
npm run test:coverage

# Modo watch
npm run test:watch
```

### Prisma 🔧
```bash
# Gerar Prisma Client
npm run prisma:generate

# Criar migração
npm run prisma:migrate

# Interface visual do banco
npm run prisma:studio
```

## 📡 Testando a API

### Health Check
```bash
curl http://localhost:3000/health
```

### Criar Receita
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d "{\"description\":\"Salário\",\"amount\":5000,\"type\":\"income\",\"category\":\"Trabalho\"}"
```

### Criar Despesa
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d "{\"description\":\"Supermercado\",\"amount\":350,\"type\":\"expense\",\"category\":\"Alimentação\"}"
```

### Listar Todas
```bash
curl http://localhost:3000/api/transactions
```

### Filtrar por Tipo
```bash
curl "http://localhost:3000/api/transactions?type=income"
curl "http://localhost:3000/api/transactions?type=expense"
```

### Resumo Financeiro
```bash
curl http://localhost:3000/api/transactions/summary
```

### Buscar por ID
```bash
curl http://localhost:3000/api/transactions/SEU_ID_AQUI
```

### Atualizar
```bash
curl -X PUT http://localhost:3000/api/transactions/SEU_ID_AQUI \
  -H "Content-Type: application/json" \
  -d "{\"amount\":6000}"
```

### Deletar
```bash
curl -X DELETE http://localhost:3000/api/transactions/SEU_ID_AQUI
```

## 🎬 Demo Automatizada

```bash
# Executar script de demonstração
# (requer API rodando)
node demo.js
```

## 🐳 Docker

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## 🧹 Limpeza

```bash
# Remover node_modules
rm -rf node_modules

# Remover dist
rm -rf dist

# Remover coverage
rm -rf coverage

# Reinstalar tudo
npm install
npm run build
```

## 📊 Estrutura de Pastas

```
src/
├── modules/          # Módulos da aplicação
│   └── transactions/ # Módulo de transações
│       ├── controller.ts
│       ├── service.ts
│       ├── repository.ts
│       ├── routes.ts
│       └── __tests__/
├── shared/           # Código compartilhado
│   ├── database/
│   ├── errors/
│   ├── interfaces/
│   └── middlewares/
└── server.ts         # Entrada da aplicação
```

## 🔗 Links Úteis

- API: http://localhost:3000
- Health: http://localhost:3000/health
- Prisma Studio: http://localhost:5555 (após `npm run prisma:studio`)

## 📝 Variáveis de Ambiente

Edite o arquivo `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/finance_db?schema=public"
PORT=3000
NODE_ENV=development
```

## ⚡ Workflow Completo

```bash
# 1. Iniciar banco de dados
docker-compose up -d

# 2. Aguardar inicialização
timeout 5

# 3. Executar migrações
npm run prisma:migrate

# 4. Iniciar API
npm run dev

# 5. Em outro terminal, testar
curl http://localhost:3000/health

# 6. Rodar demo
node demo.js
```

## 🎯 Status Atual

- ✅ Projeto instalado e compilado
- ✅ Testes unitários passando (18/18)
- ✅ TypeScript configurado
- ✅ Clean Architecture implementada
- ✅ SOLID aplicado
- ⚙️ Aguardando PostgreSQL para rodar API

---

**Próximo passo**: Execute `docker-compose up -d` e `npm run prisma:migrate` para começar!
