# 🚀 Guia Rápido de Inicialização

## ✅ Projeto Configurado com Sucesso!

### 📦 O que já está pronto:

- ✅ Dependências instaladas
- ✅ TypeScript configurado e compilando
- ✅ Testes unitários passando (18/18)
- ✅ Estrutura Clean Architecture completa
- ✅ Princípios SOLID implementados

### 🗄️ Para usar o banco de dados PostgreSQL:

#### Opção 1: PostgreSQL Local

1. Instale PostgreSQL 14+
2. Crie o banco de dados:
```sql
CREATE DATABASE finance_db;
```

3. Configure o `.env` (já criado) com suas credenciais
4. Execute as migrações:
```bash
npm run prisma:migrate
```

#### Opção 2: PostgreSQL com Docker

```bash
# Inicie um container PostgreSQL
docker run --name finance-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=finance_db -p 5432:5432 -d postgres:14

# Execute as migrações
npm run prisma:migrate
```

### 🚀 Executar a API

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm run build
npm start
```

A API estará disponível em: http://localhost:3000

### 🧪 Testes

```bash
# Testes unitários (sem banco de dados) ✅
npm test -- service.test.ts
npm test -- AppError.test.ts

# Todos os testes (requer PostgreSQL)
npm test

# Cobertura
npm run test:coverage
```

### 📡 Endpoints Disponíveis

- `GET /health` - Health check
- `POST /api/transactions` - Criar transação
- `GET /api/transactions` - Listar transações
- `GET /api/transactions/:id` - Buscar por ID
- `PUT /api/transactions/:id` - Atualizar
- `DELETE /api/transactions/:id` - Deletar
- `GET /api/transactions/summary` - Resumo financeiro

### 📚 Exemplo de Uso

```bash
# Health check
curl http://localhost:3000/health

# Criar receita
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Salário",
    "amount": 5000,
    "type": "income",
    "category": "Trabalho"
  }'

# Criar despesa
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Supermercado",
    "amount": 350,
    "type": "expense",
    "category": "Alimentação"
  }'

# Listar todas
curl http://localhost:3000/api/transactions

# Resumo financeiro
curl http://localhost:3000/api/transactions/summary
```

### 🎯 Arquitetura Implementada

- ✅ **Clean Architecture** - Separação de camadas
- ✅ **SOLID** - Todos os princípios aplicados
- ✅ **Repository Pattern** - Abstração de dados
- ✅ **Dependency Injection** - Injeção de dependências
- ✅ **Validação** - Zod schemas
- ✅ **Error Handling** - Tratamento centralizado
- ✅ **Testes Unitários** - Jest com mocks

### 📝 Próximos Passos Opcionais

- Implementar autenticação JWT
- Adicionar paginação
- Integrar com Redis para cache
- Adicionar documentação Swagger
- Configurar CI/CD

---

**Status**: 🟢 Projeto pronto para desenvolvimento!
