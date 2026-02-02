# Contribuindo para Finance API

Primeiramente, obrigado por considerar contribuir para este projeto! 🎉

## Como Contribuir

### Reportando Bugs

Se você encontrar um bug, por favor abra uma issue incluindo:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Versão do Node.js e sistema operacional

### Sugerindo Melhorias

Sugestões de melhorias são sempre bem-vindas! Para isso:

1. Verifique se a sugestão já não existe nas issues
2. Abra uma nova issue com o label "enhancement"
3. Descreva claramente a melhoria proposta
4. Explique por que seria útil para o projeto

### Pull Requests

1. Fork o repositório
2. Crie uma branch a partir da `main`:
   ```bash
   git checkout -b feature/minha-feature
   ```

3. Faça suas alterações seguindo os padrões do projeto:
   - Use TypeScript
   - Mantenha a arquitetura Clean Architecture
   - Siga os princípios SOLID
   - Adicione testes para novas funcionalidades
   - Mantenha a cobertura de testes

4. Certifique-se de que os testes passam:
   ```bash
   npm test
   ```

5. Certifique-se de que o código compila:
   ```bash
   npm run build
   ```

6. Commit suas mudanças usando mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona validação de email"
   ```

7. Push para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```

8. Abra um Pull Request

## Padrões de Código

### Convenção de Commits

Seguimos a convenção [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Atualização de dependências, etc

### TypeScript

- Use tipagem estrita
- Evite `any`
- Prefira interfaces a types quando possível
- Use const para valores que não mudam

### Testes

- Teste todas as novas funcionalidades
- Mantenha os testes simples e legíveis
- Use mocks apropriadamente
- Busque 100% de cobertura em código crítico

### Arquitetura

- Mantenha a separação de responsabilidades
- Controller → Service → Repository
- Use injeção de dependências
- Siga os princípios SOLID

## Estrutura do Projeto

```
src/
├── modules/          # Módulos de domínio
├── shared/           # Código compartilhado
│   ├── database/
│   ├── errors/
│   ├── interfaces/
│   └── middlewares/
└── server.ts
```

## Dúvidas?

Se tiver dúvidas, abra uma issue ou entre em contato através das discussões do projeto.

Obrigado por contribuir! 🚀
