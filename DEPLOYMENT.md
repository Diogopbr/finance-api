# Vercel Deployment Guide

## 🚀 Deploy na Vercel

A Vercel suporta APIs Node.js através de Serverless Functions.

### Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Vercel CLI instalada: `npm i -g vercel`
3. Banco PostgreSQL (Supabase, Neon, Railway, etc.)

### Passos para Deploy

#### 1. Configurar Banco de Dados

**Opções de PostgreSQL gratuito:**
- [Supabase](https://supabase.com) - Recomendado
- [Neon](https://neon.tech)
- [Railway](https://railway.app)
- [ElephantSQL](https://www.elephantsql.com)

#### 2. Preparar Projeto

```bash
# Build do projeto
npm run build

# Gerar Prisma Client
npm run prisma:generate
```

#### 3. Deploy via CLI

```bash
# Login na Vercel
vercel login

# Deploy (primeira vez)
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Which scope? Sua conta
# - Link to existing project? No
# - Project name? finance-api
# - Directory? ./
# - Override settings? No
```

#### 4. Configurar Variáveis de Ambiente

No dashboard da Vercel:
1. Vá em Settings > Environment Variables
2. Adicione:
   - `DATABASE_URL`: Sua connection string do PostgreSQL
   - `NODE_ENV`: production

Ou via CLI:
```bash
vercel env add DATABASE_URL
# Cole sua connection string

vercel env add NODE_ENV
# Digite: production
```

#### 5. Deploy para Produção

```bash
vercel --prod
```

### Executar Migrações

**Após deploy, execute as migrações:**

```bash
# Método 1: Localmente apontando para prod
DATABASE_URL="sua_url_production" npm run prisma:migrate

# Método 2: Via Vercel CLI
vercel env pull .env.production
npm run prisma:migrate
```

### Endpoints da API

Após deploy, sua API estará disponível em:
```
https://seu-projeto.vercel.app/health
https://seu-projeto.vercel.app/api/transactions
```

### Scripts Package.json

Adicione ao `package.json`:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && npm run build"
  }
}
```

### Limitações da Vercel (Free Tier)

- ⏱️ Timeout: 10 segundos por request
- 💾 Tamanho: 50MB por deployment
- 🔄 Cold starts em serverless
- 📊 Bandwidth: 100GB/mês

### Alternativas para APIs Node.js

Se precisar de mais recursos:

1. **Railway** (Recomendado para APIs)
   - PostgreSQL incluído
   - Sem cold starts
   - Deploy automático via Git

2. **Render**
   - Free tier generoso
   - PostgreSQL gratuito
   - Boa para APIs

3. **Fly.io**
   - Global deployment
   - PostgreSQL incluído
   - Containers Docker

## 🔧 Configuração Completa

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

### .vercelignore

```
node_modules
src
*.test.ts
coverage
.env
.env.local
```

## 📝 Checklist de Deploy

- [ ] Build funcionando (`npm run build`)
- [ ] Testes passando (`npm test`)
- [ ] Banco PostgreSQL configurado
- [ ] Variáveis de ambiente setadas
- [ ] `vercel.json` criado
- [ ] Deploy realizado
- [ ] Migrações executadas
- [ ] Health check funcionando
- [ ] Endpoints testados

## 🎯 Recomendação Final

**Para este projeto (Finance API), recomendo usar Railway ao invés da Vercel:**

### Por que Railway?

✅ **Melhor para APIs:**
- Sem limitação de timeout
- Servidor sempre ativo (sem cold starts)
- PostgreSQL incluído gratuitamente
- Melhor performance

✅ **Deploy mais simples:**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Criar projeto
railway init

# Deploy
railway up
```

✅ **PostgreSQL incluso:**
- Não precisa de serviço externo
- Configuração automática
- Migrations fáceis

## 🚀 Deploy Alternativo: Railway

```bash
# 1. Install CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Initialize
railway init

# 4. Add PostgreSQL
railway add

# 5. Deploy
railway up

# 6. Get DATABASE_URL
railway variables

# 7. Run migrations
railway run npm run prisma:migrate
```

---

**Escolha Railway para melhor experiência com APIs Node.js!** 🚂
