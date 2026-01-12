# Documento de Casos de Testes  
**Sistema de Estoque Enterprise**  
**Versão do MVP:** 1.0 (concluída em 11/01/2026)

**Objetivo do documento:**  
Registrar os principais casos de teste manuais realizados para validar o funcionamento correto do sistema, cobrindo fluxos críticos, cenários de erro e regras de negócio.  
Todos os testes foram executados manualmente pelo desenvolvedor durante o desenvolvimento e na fase final de aceitação.

**Data de elaboração:** 11 de janeiro de 2026  
**Responsável pelos testes:** Klayton B. Prince  
**Ambiente de teste:**  
- Navegador: Google Chrome 128+  
- Sistema operacional: Windows 11  
- LocalStorage limpo antes de cada bateria de testes críticos  
- Dados de teste: ~50 itens fictícios + 5 usuários + 8 setores

**Critérios gerais de aprovação:**
- Passou: comportamento esperado conforme requisitos
- Falhou: bug, comportamento inesperado ou violação de regra
- Bloqueado: teste não executado por dependência

---

## 1. Casos de Teste – Autenticação e Sessão

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-A01| Login com credenciais corretas (admin)             | 1. Digitar login "admin" e senha correta<br>2. Clicar em Entrar                          | Redireciona para dashboard admin, log registrado        | OK                 | Passou   |
| TC-A02| Login credenciais incorretas                       | 1. Digitar login/senha errados<br>2. Clicar em Entrar                                    | Toast de erro "Credenciais inválidas"                   | OK                 | Passou   |
| TC-A03| Primeiro acesso – alteração obrigatória de senha   | 1. Login com senha inicial<br>2. Modal de nova senha aparece                             | Senha atualizada, flag primeiroAcesso = false           | OK                 | Passou   |
| TC-A04| Usuário bloqueado tenta login                      | 1. Bloquear usuário via admin<br>2. Tentar login                                         | Toast "Usuário bloqueado"                               | OK                 | Passou   |
| TC-A05| Logout funcional                                       | 1. Logado → clicar [Sair]                                                                | Volta para tela de login, sessão limpa                  | OK                 | Passou   |

---

## 2. Casos de Teste – Gestão de Usuários (apenas Admin)

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-U01| Criar novo usuário (setor)                         | 1. Novo usuário<br>2. Preencher login, senha, tipo "setor", selecionar setor             | Usuário criado, flag primeiroAcesso = true, log gerado  | OK                 | Passou   |
| TC-U02| Criar usuário com login duplicado                  | 1. Tentar criar com login já existente                                                   | Toast de erro "Login já existe"                         | OK                 | Passou   |
| TC-U03| Bloquear / desbloquear usuário                     | 1. Bloquear usuário<br>2. Tentar login<br>3. Desbloquear                                | Login bloqueado → desbloqueado com sucesso              | OK                 | Passou   |
| TC-U04| Resetar senha de usuário                           | 1. Resetar senha de usuário X                                                            | Nova senha temporária gerada, flag primeiroAcesso = true| OK                 | Passou   |
| TC-U05| Excluir usuário (não admin)                        | 1. Excluir usuário comum                                                                 | Usuário removido, log gerado                            | OK                 | Passou   |

---

## 3. Casos de Teste – Gestão de Setores (Admin / Almoxarifado)

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-S01| Criar novo setor                                   | 1. Novo setor → nome, emoji, cor                                                         | Setor aparece na lista, ordem automática                | OK                 | Passou   |
| TC-S02| Bloquear setor → tentar utilizar item              | 1. Bloquear setor<br>2. Operador tenta utilizar item                                     | Botão Utilizar desativado                               | OK                 | Passou   |
| TC-S03| Tentar excluir setor com itens                     | 1. Setor com qtd > 0 → tentar excluir                                                    | Toast de erro "Setor contém itens"                      | OK                 | Passou   |
| TC-S04| Reordenar setores via drag & drop                  | 1. Arrastar setores para nova ordem                                                      | Ordem salva e refletida na interface                    | OK                 | Passou   |

---

## 4. Casos de Teste – Estoque e Movimentações

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-E01| Adicionar item novo ao estoque                     | 1. Nome + quantidade > 0                                                                 | Item criado no setor 'estoque'                          | OK                 | Passou   |
| TC-E02| Incrementar item existente                         | 1. Adicionar mesmo item novamente                                                        | Quantidade somada                                       | OK                 | Passou   |
| TC-E03| Transferência via drag & drop                      | 1. Arrastar item do estoque → setor<br>2. Informar qtd                                   | Deduz do estoque, adiciona ao setor                     | OK                 | Passou   |
| TC-E04| Transferência quantidade maior que disponível      | 1. Tentar transferir qtd > disponível                                                    | Toast de erro, operação cancelada                       | OK                 | Passou   |
| TC-E05| Utilizar (consumir) item no próprio setor          | 1. Operador clica Utilizar várias vezes                                                  | Quantidade decrementa, log gerado                       | OK                 | Passou   |

---

## 5. Casos de Teste – Sistema de Solicitações

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-Q01| Operador solicita item zerado                      | 1. Item qtd=0 no setor → Solicitar +<br>2. Informar qtd                                 | Solicitação criada, log gerado                          | OK                 | Passou   |
| TC-Q02| Almoxarifado atende solicitação parcial            | 1. Atender solicitação com qtd menor                                                     | Deduz parcial do estoque, adiciona ao setor             | OK                 | Passou   |
| TC-Q03| Solicitação sem estoque disponível                 | 1. Solicitar item inexistente ou qtd=0                                                   | Permite criar (registro), mas atendimento falha         | OK                 | Passou   |

---

## 6. Casos de Teste – Auditoria e Logs

| ID    | Caso de Teste                                      | Passos                                                                                   | Resultado Esperado                                      | Resultado Obtido | Status   |
|-------|----------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------|----------|
| TC-L01| Verificação de log após login                      | 1. Fazer login                                                                           | Log com data/hora/IP/Device ID aparece                  | OK                 | Passou   |
| TC-L02| FIFO de logs (máximo 200)                          | 1. Gerar > 200 ações                                                                     | Mantém apenas os 200 mais recentes                      | OK                 | Passou   |

---

## 7. Resumo Geral dos Testes

- **Total de casos planejados:** 38  
- **Casos executados:** 38  
- **Taxa de aprovação:** 100% (todos passaram após correções pontuais durante desenvolvimento)  
- **Bugs críticos encontrados:** 0 após fase final  
- **Observações finais:**  
  - Todos os fluxos principais foram validados com dados fictícios  
  - Testes de limite (1000+ itens) simulados → performance aceitável até ~1200 itens  
  - Recomendação pós-MVP: implementar testes automatizados (Jest) para regressão

**Conclusão:**  
O MVP foi considerado **aprovado para uso piloto** em 11/01/2026 após bateria completa de testes manuais.

**Assinatura final:**  
Klayton B. Prince  
Desenvolvedor e Responsável por Qualidade  
11 de janeiro de 2026