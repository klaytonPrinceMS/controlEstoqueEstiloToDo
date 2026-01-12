# Guia de Contribuições  
**Sistema de Estoque Enterprise**  
**Versão atual:** 1.0 (MVP concluído em 11/01/2026)

Bem-vindo(a) ao projeto **Sistema de Estoque Enterprise**!  
Este é um sistema 100% offline de gestão de estoque multi-setorial, feito em HTML + CSS + JavaScript Vanilla, sem frameworks ou dependências externas.

Agradecemos seu interesse em contribuir!  
Atualmente o projeto é mantido principalmente por **Klayton B. Prince**, mas contribuições externas são super bem-vindas, especialmente agora que o MVP está concluído e pronto para melhorias e evoluções.

---

## Como Contribuir

### 1. Encontrou um bug? Tem uma sugestão?

1. Abra uma **Issue** no repositório  
   - Use o template de **Bug Report** ou **Feature Request** (se disponível)  
   - Seja o mais descritivo possível: passos para reproduzir, versão do navegador, prints, etc.

2. Se for algo simples e você já sabe como corrigir → pule direto para o Pull Request (veja abaixo)

### 2. Quer enviar uma melhoria ou correção?

**Fluxo recomendado:**

1. **Fork** o repositório  
2. Crie uma branch com nome descritivo:

 - git checkout -b feature/nova-funcionalidade-exportacao-json
 - git checkout -b fix/bug-toast-nao-desaparece
 - git checkout -b refactor/melhorar-busca-linear

3. Faça suas alterações seguindo os **Padrões de Codificação** do projeto  
(veja o documento `Padroes-Codificacao-EstoqueEnterprise.md`)
4. Teste localmente (abra o `index.html` no navegador)
5. Commit com mensagens claras (padrão Conventional Commits recomendado):

 - eat: adiciona função de exportação JSON
 - fix: corrige toast que não desaparecia
 - refactor: otimiza busca por nome com índice simples
 - docs: atualiza guia e documentos

6. Abra um **Pull Request** (PR) contra a branch `main`
- Descreva o que foi feito
- Inclua prints ou gifs se for mudança visual
- Referencie a issue relacionada (se houver): `Fixes #42`

### 3. Boas Práticas para Contribuir

- Mantenha o espírito do projeto: **zero dependências**, **100% offline**, **simplicidade**
- Não introduza frameworks (React, Vue, etc.) nem bibliotecas externas sem discussão prévia
- Prefira melhorias na base da pirâmide (unit tests, performance, legibilidade)
- Documente bem novas funções (JSDoc) e atualize a documentação existente
- Teste em pelo menos 2 navegadores (Chrome + Firefox/Edge)

---

## Contribuições Aprovadas e Bem-vindas

Aqui estão algumas ideias de melhorias que seriam extremamente úteis e bem aceitas:

- Implementação de **exportação e importação JSON** (backup/restauração)
- **Índice simples** (Map) para melhorar busca com muitos itens (>1000)
- **Compressão básica** dos dados salvos no LocalStorage (ex: LZ-string)
- **Testes automatizados** iniciais (Jest para funções críticas)
- Melhorias de **responsividade e suporte mobile** (touch events no drag & drop)
- **Tema dark mode** automático (via prefers-color-scheme)
- **Validação de senha** mais robusta no primeiro acesso (mínimo de caracteres, etc.)
- **Função de limpeza automática** de itens zerados antigos

Se quiser trabalhar em alguma dessas ou em outra ideia → abra uma issue primeiro para alinharmos!

---

## Agradecimentos Especiais às as pessoas que Ajudaram a Construir e Documentar o Projeto

O MVP e toda a documentação foram significativamente acelerados e enriquecidos graças a contribuições colaborativas de pessoas especiais. Agradecimentos especiais a:

- **Daniel Antonio Bandeira** Dono da ideia inicial

Obrigado a todos vocês! O projeto é um exemplo real de como humanos podem entregar valor muito rapidamente.
---

## Contato e Comunicação

- **Dono do projeto:** Klayton B. Prince  
- **Issues e PRs:** Use o repositório GitHub (ou GitLab, conforme configurado)  
- **Dúvidas gerais:** Abra uma issue com a tag "question"

Vamos construir juntos um sistema de estoque simples, poderoso e gratuito para quem mais precisa!

**Obrigado por contribuir!**  
🚀












