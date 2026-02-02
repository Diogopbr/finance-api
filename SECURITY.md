# Security Policy

## Reportando Vulnerabilidades

A segurança deste projeto é levada a sério. Se você descobrir uma vulnerabilidade de segurança, por favor **NÃO** abra uma issue pública.

### Como Reportar

Envie um email detalhando:

1. Descrição da vulnerabilidade
2. Passos para reproduzir
3. Possível impacto
4. Sugestão de correção (se houver)

### O que Esperar

- Resposta inicial em até 48 horas
- Avaliação da vulnerabilidade
- Desenvolvimento de correção
- Release de patch de segurança
- Crédito público (se desejado)

## Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 1.0.x  | :white_check_mark: |

## Boas Práticas de Segurança

Ao usar este projeto:

1. **Nunca** commite arquivos `.env` com credenciais reais
2. Use variáveis de ambiente para dados sensíveis
3. Mantenha as dependências atualizadas
4. Use HTTPS em produção
5. Implemente rate limiting
6. Use autenticação forte (JWT, OAuth, etc.)

## Recursos de Segurança Implementados

- ✅ Validação de entrada com Zod
- ✅ Tratamento de erros centralizado
- ✅ Sanitização de dados
- ✅ Proteção contra SQL injection (via Prisma)
- ✅ Variáveis de ambiente para credenciais

## Melhorias de Segurança Futuras

- [ ] Rate limiting
- [ ] Helmet.js para headers de segurança
- [ ] CORS configurável
- [ ] Autenticação JWT
- [ ] Auditoria de logs
- [ ] Criptografia de dados sensíveis

---

**Obrigado por ajudar a manter este projeto seguro!**
