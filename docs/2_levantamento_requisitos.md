# 📋 Documentação de Levantamento de Requisitos
---
## 📑 Índice

1. [Introdução](#1-introdução)
2. [Visão Geral do Sistema](#2-visão-geral-do-sistema)
3. [Requisitos Funcionais](#3-requisitos-funcionais)
4. [Requisitos Não-Funcionais](#4-requisitos-não-funcionais)
5. [Casos de Uso](#5-casos-de-uso)
6. [Modelo de Dados](#6-modelo-de-dados)
7. [Regras de Negócio](#7-regras-de-negócio)
8. [Interface do Usuário](#8-interface-do-usuário)
9. [Segurança](#9-segurança)
10. [Considerações Técnicas](#10-considerações-técnicas)
11. [Glossário](#11-glossário)

---

## 1. Introdução

### 1.1 Propósito

Este documento especifica os requisitos funcionais e não-funcionais para o desenvolvimento do Sistema de Estoque Enterprise v6.0, uma aplicação web para gestão multi-setorial de estoque com controle de usuários e auditoria completa.

### 1.2 Escopo

O sistema deve permitir:
- Controle centralizado de estoque
- Gestão multi-usuário com níveis de permissão
- Distribuição de materiais entre setores
- Sistema de solicitações e aprovações
- Auditoria completa de movimentações
- Funcionamento 100% offline

### 1.3 Stakeholders

| Papel | Responsabilidade | Interesse |
|-------|------------------|-----------|
| Administrador | Gestão completa do sistema | Controle total e auditoria |
| Almoxarifado | Gestão de estoque central | Distribuição eficiente |
| Operador de Setor | Uso de materiais | Acesso rápido aos recursos |
| Auditoria | Fiscalização | Rastreabilidade completa |

### 1.4 Definições e Acrônimos

- **RF** - Requisito Funcional
- **RNF** - Requisito Não-Funcional
- **CRUD** - Create, Read, Update, Delete
- **SPA** - Single Page Application
- **WebRTC** - Web Real-Time Communication

---

## 2. Visão Geral do Sistema

### 2.1 Perspectiva do Produto

Sistema standalone de gestão de estoque que opera integralmente no navegador do cliente, sem necessidade de servidor backend ou conexão com internet.

### 2.2 Funções do Produto

```
┌────────────────────────────────────────────────┐
│         Sistema de Estoque Enterprise          │
├────────────────────────────────────────────────┤
│                                                │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  Autenticação│  │   Gestão de  │            │
│  │  Multi-Nível │  │   Usuários   │            │
│  └──────────────┘  └──────────────┘            │
│                                                │
│  ┌──────────────┐  ┌──────────────┐            │
│  │   Controle   │  │   Sistema de │            │
│  │  de Estoque  │  │  Solicitações│            │
│  └──────────────┘  └──────────────┘            │
│                                                │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Transferência│  │   Auditoria  │            │
│  │  de Materiais│  │   e Logs     │            │
│  └──────────────┘  └──────────────┘            │
│                                                │
└────────────────────────────────────────────────┘
```

### 2.3 Características dos Usuários

#### Perfil: Administrador
- **Experiência:** Avançada em sistemas
- **Frequência de Uso:** Diária
- **Funções Críticas:** Gestão completa

#### Perfil: Almoxarifado
- **Experiência:** Intermediária
- **Frequência de Uso:** Diária/contínua
- **Funções Críticas:** Gestão de estoque e distribuição

#### Perfil: Operador de Setor
- **Experiência:** Básica
- **Frequência de Uso:** Conforme necessidade
- **Funções Críticas:** Solicitação e uso de materiais

### 2.4 Restrições

- Deve funcionar sem conexão com internet
- Deve ser compatível com navegadores modernos (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- Sem dependências de bibliotecas externas
- Armazenamento limitado ao LocalStorage do navegador (~5-10MB)

---

## 3. Requisitos Funcionais

### 3.1 Autenticação e Controle de Acesso

#### RF-001: Login de Usuário
**Prioridade:** Alta  
**Descrição:** O sistema deve permitir login com usuário e senha.

**Critérios de Aceitação:**
- Sistema valida credenciais contra banco local
- Exibe mensagem de erro para credenciais inválidas
- Bloqueia acesso de usuários marcados como bloqueados
- Registra data/hora/IP/Device ID do acesso

**Fluxo Principal:**
```
1. Usuário insere login e senha
2. Sistema valida credenciais
3. Sistema verifica se usuário está bloqueado
4. Sistema obtém IP local e Device ID
5. Sistema registra acesso em log
6. Sistema redireciona para interface apropriada
```

**Fluxos Alternativos:**
- FA-001: Credenciais inválidas → Exibe erro
- FA-002: Usuário bloqueado → Exibe erro e não permite acesso
- FA-003: Primeiro acesso → Força alteração de senha

#### RF-002: Alteração de Senha no Primeiro Acesso
**Prioridade:** Alta  
**Descrição:** Sistema deve forçar alteração de senha no primeiro login.

**Critérios de Aceitação:**
- Exibe prompt para nova senha
- Valida senha não vazia
- Atualiza hash da senha
- Marca flag `primeiroAcesso` como false

#### RF-003: Logout
**Prioridade:** Alta  
**Descrição:** Usuário deve poder sair do sistema.

**Critérios de Aceitação:**
- Registra logout em log
- Limpa sessão do usuário
- Retorna para tela de login
- Limpa campos de login

#### RF-004: Controle de Permissões por Perfil
**Prioridade:** Alta  
**Descrição:** Sistema deve restringir funcionalidades por perfil.

**Matriz de Permissões:**

| Funcionalidade | Admin | Almoxarifado | Operador |
|----------------|-------|--------------|----------|
| Criar usuários | ✅ | ❌ | ❌ |
| Criar setores | ✅ | ❌ | ❌ |
| Bloquear setores | ✅ | ✅ | ❌ |
| Adicionar ao estoque | ✅ | ✅ | ❌ |
| Transferir materiais | ✅ | ✅ | ❌ |
| Atender solicitações | ✅ | ✅ | ❌ |
| Resgatar de setores | ✅ | ✅ | ❌ |
| Solicitar materiais | ✅ | ✅ | ✅ |
| Utilizar materiais | ✅ | ✅ | ✅* |
| Visualizar auditoria | ✅ | ❌ | ❌ |
| Resetar sistema | ✅ | ❌ | ❌ |

*Apenas no próprio setor

---

### 3.2 Gestão de Usuários

#### RF-005: Criar Usuário
**Prioridade:** Alta  
**Descrição:** Admin deve poder criar novos usuários.

**Campos Obrigatórios:**
- Login (único)
- Senha
- Tipo (admin, almoxarifado, setor)
- Setor (se tipo = setor)

**Critérios de Aceitação:**
- Valida login único
- Hash de senha aplicado
- Flag `primeiroAcesso` = true
- Registro em log de auditoria

#### RF-006: Bloquear/Desbloquear Usuário
**Prioridade:** Média  
**Descrição:** Admin deve poder bloquear acesso de usuários.

**Critérios de Aceitação:**
- Alterna flag `bloqueado`
- Registra ação em log
- Impede login de usuários bloqueados

#### RF-007: Resetar Senha de Usuário
**Prioridade:** Média  
**Descrição:** Admin deve poder resetar senha de qualquer usuário.

**Critérios de Aceitação:**
- Permite definir senha temporária
- Aplica hash
- Marca `primeiroAcesso` = true
- Registra ação em log

#### RF-008: Excluir Usuário
**Prioridade:** Média  
**Descrição:** Admin deve poder excluir usuários (exceto admin).

**Critérios de Aceitação:**
- Solicita confirmação
- Impede exclusão do usuário admin
- Remove permanentemente do banco
- Registra ação em log

#### RF-009: Visualizar Lista de Usuários
**Prioridade:** Alta  
**Descrição:** Admin deve visualizar todos os usuários cadastrados.

**Informações Exibidas:**
- Login
- Tipo
- Setor vinculado
- Último IP de acesso
- Device ID
- Última data/hora de acesso
- Status (bloqueado/ativo)

---

### 3.3 Gestão de Setores

#### RF-010: Criar Setor
**Prioridade:** Alta  
**Descrição:** Admin deve poder criar novos setores.

**Campos:**
- Nome (obrigatório)
- Emoji (opcional, padrão: 🏢)
- Cor de fundo (padrão: #ffffff)

**Critérios de Aceitação:**
- Nome não pode ser vazio
- Emoji deve ser caractere único
- Cor deve ser hex válido
- Setor recebe ordem sequencial
- Registra em log

#### RF-011: Editar Setor
**Prioridade:** Média  
**Descrição:** Admin deve poder editar setores existentes.

**Critérios de Aceitação:**
- Não pode editar setor "Estoque Central" (fixo)
- Pode alterar nome, emoji e cor
- Mantém ID e ordem
- Registra em log

#### RF-012: Excluir Setor
**Prioridade:** Média  
**Descrição:** Admin deve poder excluir setores vazios.

**Critérios de Aceitação:**
- Verifica se setor tem itens (qtd > 0)
- Impede exclusão se tiver itens
- Não pode excluir setor fixo
- Remove do banco
- Registra em log

#### RF-013: Reordenar Setores
**Prioridade:** Baixa  
**Descrição:** Admin/Almoxarifado deve poder reordenar setores via drag-drop.

**Critérios de Aceitação:**
- Apenas setores não-fixos podem mover
- Atualiza campo `ordem` automaticamente
- Persiste nova ordem
- Interface reflete imediatamente

#### RF-014: Bloquear/Desbloquear Setor
**Prioridade:** Média  
**Descrição:** Admin/Almoxarifado deve poder bloquear setores.

**Efeitos do Bloqueio:**
- Impede utilização de materiais
- Impede solicitações
- Não impede transferências admin
- Visual diferenciado (ícone 🔒)
- Registra em log

---

### 3.4 Gestão de Estoque

#### RF-015: Adicionar Item ao Estoque
**Prioridade:** Alta  
**Descrição:** Admin/Almoxarifado deve adicionar itens ao estoque central.

**Campos:**
- Nome do item (obrigatório)
- Quantidade (obrigatório, > 0)

**Critérios de Aceitação:**
- Se item existe, incrementa quantidade
- Se não existe, cria novo registro
- Item sempre no setor "estoque"
- Registra em log com quantidade

#### RF-016: Buscar Item no Estoque
**Prioridade:** Alta  
**Descrição:** Sistema deve permitir busca de itens.

**Tipos de Busca:**
1. **Admin/Almoxarifado:** Busca inline no setor estoque (filtra cartões)
2. **Operador:** Busca global dedicada com resultados disponíveis

**Critérios de Aceitação:**
- Busca por substring (case-insensitive)
- Atualiza resultados em tempo real
- Exibe apenas itens com qtd > 0 (para operadores)
- Permite solicitar diretamente da busca

#### RF-017: Incrementar Quantidade
**Prioridade:** Média  
**Descrição:** Admin/Almoxarifado pode adicionar unidades a item existente.

**Critérios de Aceitação:**
- Botão "+1" visível em cada item do estoque
- Incrementa quantidade
- Atualiza interface imediatamente
- Não registra em log (operação menor)

#### RF-018: Excluir Item Zerado
**Prioridade:** Baixa  
**Descrição:** Admin/Almoxarifado pode excluir registros com quantidade zero.

**Critérios de Aceitação:**
- Botão "Excluir" só aparece se qtd = 0
- Solicita confirmação
- Remove registro do banco
- Atualiza interface

---

### 3.5 Sistema de Solicitações

#### RF-019: Solicitar Reposição
**Prioridade:** Alta  
**Descrição:** Operador pode solicitar reposição de item zerado em seu setor.

**Fluxo:**
```
1. Item zerado exibe botão "Solicitar +"
2. Modal exibe disponibilidade no estoque
3. Operador define quantidade
4. Sistema cria registro em "solicitacao"
5. Registra em log
6. Notifica sucesso
```

**Critérios de Aceitação:**
- Verifica disponibilidade no estoque central
- Valida quantidade <= disponível
- Cria item com setorId = "solicitacao"
- Guarda setor destino em campo `destino`
- Registra solicitante em log

#### RF-020: Solicitar Item Novo (Busca)
**Prioridade:** Alta  
**Descrição:** Operador pode solicitar item que não tem em seu setor.

**Fluxo:**
```
1. Operador busca no estoque central
2. Clica em "Solicitar" no item desejado
3. Define quantidade
4. Sistema cria solicitação
```

**Critérios de Aceitação:**
- Mesmas validações do RF-019
- Permite buscar qualquer item do estoque
- Limpa busca após solicitar

#### RF-021: Atender Solicitação
**Prioridade:** Alta  
**Descrição:** Admin/Almoxarifado pode aprovar solicitações.

**Fluxo:**
```
1. Visualiza solicitações pendentes
2. Verifica estoque disponível
3. Clica em "Atender"
4. Sistema:
   - Deduz do estoque central
   - Adiciona ao setor destino
   - Remove solicitação
   - Registra em log
```

**Critérios de Aceitação:**
- Valida estoque suficiente
- Cria ou incrementa item no setor destino
- Remove registro de solicitação
- Registra ação em log

#### RF-022: Recusar Solicitação
**Prioridade:** Média  
**Descrição:** Admin/Almoxarifado pode recusar solicitações.

**Critérios de Aceitação:**
- Solicita confirmação
- Remove registro de solicitação
- Registra recusa em log
- Não afeta estoque

---

### 3.6 Transferência de Materiais

#### RF-023: Transferir via Drag-and-Drop
**Prioridade:** Alta  
**Descrição:** Admin/Almoxarifado pode arrastar itens do estoque para setores.

**Fluxo:**
```
1. Arrasta item do estoque
2. Solta em setor destino
3. Modal solicita quantidade
4. Sistema:
   - Deduz do estoque
   - Adiciona ao setor
   - Registra transferência
```

**Critérios de Aceitação:**
- Apenas itens do estoque são arrastáveis
- Não permite drop no próprio estoque
- Não permite drop em "solicitacao"
- Valida setor destino não bloqueado
- Valida quantidade <= disponível
- Cria ou incrementa item no destino

#### RF-024: Resgatar Material de Setor
**Prioridade:** Média  
**Descrição:** Admin/Almoxarifado pode retornar materiais ao estoque.

**Fluxo:**
```
1. Clica em "Resgatar" em item de setor
2. Define quantidade
3. Sistema:
   - Deduz do setor
   - Retorna ao estoque
   - Registra resgate
```

**Critérios de Aceitação:**
- Botão só aparece para Admin/Almoxarifado
- Valida quantidade <= disponível no setor
- Remove item se quantidade zerada
- Adiciona ao estoque central
- Registra em log

---

### 3.7 Utilização de Materiais

#### RF-025: Utilizar Material
**Prioridade:** Alta  
**Descrição:** Operador pode consumir materiais do seu setor.

**Critérios de Aceitação:**
- Botão "Utilizar" só aparece no próprio setor
- Decrementa quantidade em 1
- Verifica se setor está bloqueado
- Se qtd chega a 0, muda visual do cartão
- Registra uso em log

---

### 3.8 Auditoria e Logs

#### RF-026: Registrar Logs de Ações
**Prioridade:** Alta  
**Descrição:** Sistema deve registrar todas as ações relevantes.

**Formato do Log:**
```
[DD/MM/YYYY HH:MM:SS] Usuario (IP: xxx.xxx.xxx.xxx | MAC: ID-xxxxx): Ação
```

**Ações Registradas:**
- Login/Logout
- Criação/exclusão/bloqueio de usuários
- Reset de senhas
- Criação/edição/exclusão de setores
- Bloqueio/desbloqueio de setores
- Adição de itens ao estoque
- Transferências de materiais
- Solicitações (criar/atender/recusar)
- Resgates
- Utilizações de materiais
- Reset de sistema

**Critérios de Aceitação:**
- Log inclui timestamp completo
- Log inclui IP local do usuário
- Log inclui Device ID
- Logs mantidos em FIFO (200 últimos)
- Exibidos em ordem decrescente (mais recente primeiro)

#### RF-027: Visualizar Auditoria
**Prioridade:** Alta  
**Descrição:** Admin deve visualizar logs completos.

**Critérios de Aceitação:**
- Acesso exclusivo do Admin
- Exibe em painel dedicado
- Formato monospace para legibilidade
- Scroll para logs antigos
- Atualiza automaticamente após ações

---

### 3.9 Interface e Usabilidade

#### RF-028: Filtro de Itens por Setor
**Prioridade:** Média  
**Descrição:** Operador deve poder filtrar itens em seu setor.

**Critérios de Aceitação:**
- Campo de busca dentro de cada setor
- Filtra em tempo real (oninput)
- Oculta itens não correspondentes
- Busca case-insensitive

#### RF-029: Notificações Toast
**Prioridade:** Média  
**Descrição:** Sistema deve exibir feedback visual de ações.

**Tipos:**
- Sucesso (verde)
- Erro (vermelho)

**Critérios de Aceitação:**
- Aparece no canto inferior direito
- Desaparece após 3 segundos
- Empilha múltiplas notificações
- Animação de entrada suave

#### RF-030: Reset de Emergência
**Prioridade:** Baixa  
**Descrição:** Permitir reset completo via tela de login.

**Critérios de Aceitação:**
- Botão discreto na tela de login
- Solicita confirmação dupla
- Limpa todo LocalStorage
- Recarrega página
- Restaura usuário admin padrão

#### RF-031: Reset Total do Sistema
**Prioridade:** Baixa  
**Descrição:** Admin pode resetar dados mantendo estrutura.

**Opções:**
1. Manter usuários cadastrados
2. Manter apenas admin

**Critérios de Aceitação:**
- Solicita confirmação múltipla
- Pergunta sobre usuários
- Limpa todos os itens
- Remove setores não-fixos
- Limpa logs
- Registra reset antes de limpar
- Recarrega sistema

---

## 4. Requisitos Não-Funcionais

### 4.1 Desempenho

#### RNF-001: Tempo de Resposta
- Interface deve responder em < 100ms para ações locais
- Renderização de setores deve ocorrer em < 500ms
- Busca deve filtrar resultados em < 50ms

#### RNF-002: Capacidade
- Suportar até 1000 itens sem degradação perceptível
- Suportar até 100 usuários cadastrados
- Suportar até 50 setores
- Manter 200 logs em memória

### 4.2 Usabilidade

#### RNF-003: Interface
- Design responsivo (mobile-first)
- Suporte a touch em dispositivos móveis
- Navegação intuitiva sem necessidade de treinamento extensivo
- Feedback visual para todas as ações

#### RNF-004: Acessibilidade
- Contraste mínimo de 4.5:1 para textos
- Elementos interativos com área mínima de 44x44px
- Navegação completa por teclado (opcional para v6.0)

### 4.3 Compatibilidade

#### RNF-005: Navegadores
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

#### RNF-006: Dispositivos
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

### 4.4 Segurança

#### RNF-007: Autenticação
- Senhas armazenadas com hash (btoa + reverse)
- Sessão limpa ao fechar navegador
- Bloqueio preventivo de usuários

#### RNF-008: Dados
- Armazenamento local criptografado (hash básico)
- Sem transmissão de dados sensíveis
- Rastreamento apenas de IP local (não público)

### 4.5 Manutenibilidade

#### RNF-009: Código
- JavaScript vanilla (sem frameworks)
- Código comentado em português
- Funções com responsabilidade única
- Separação clara de concerns

#### RNF-010: Documentação
- Comentários inline explicativos
- Documentação de API interna
- README completo
- Este documento de requisitos

### 4.6 Confiabilidade

#### RNF-011: Persistência
- Auto-save após cada ação
- Recuperação automática ao reabrir
- Tolerância a erros de localStorage

#### RNF-012: Disponibilidade
- Funcionar 100% offline
- Sem dependências de rede
- Sem pontos únicos de falha

---

## 5. Casos de Uso

### UC-001: Realizar Login

**Ator Principal:** Usuário (qualquer perfil)

**Pré-condições:**
- Sistema aberto no navegador
- Usuário cadastrado no sistema

**Fluxo Principal:**
1. Usuário acessa sistema
2. Sistema exibe tela de login
3. Usuário insere login e senha
4. Usuário clica em "Entrar no Sistema"
5. Sistema valida credenciais
6. Sistema verifica se usuário está bloqueado
7. Sistema obtém IP local via WebRTC
8. Sistema gera Device ID
9. Sistema registra acesso em log
10. Sistema exibe interface apropriada ao perfil

**Fluxos Alternativos:**

**FA-1: Credenciais Inválidas**
- 5a. Sistema não encontra usuário ou senha incorreta
- 5b. Sistema exibe toast de erro
- 5c. Retorna ao passo 3

**FA-2: Usuário Bloqueado**
- 6a. Usuário está marcado como bloqueado
- 6b. Sistema exibe toast informando bloqueio
- 6c. Retorna ao passo 3

**FA-3: Primeiro Acesso**
- 10a. Flag `primeiroAcesso` = true
- 10b. Sistema exibe prompt para nova senha
- 10c. Usuário define nova senha
- 10d. Sistema atualiza senha e marca flag = false
- 10e. Continua fluxo normal

**Pós-condições:**
- Usuário autenticado
- Sessão ativa
- Log de acesso registrado
- Interface carregada conforme permissões

---

### UC-002: Criar Novo Usuário

**Ator Principal:** Administrador

**Pré-condições:**
- Admin autenticado
- Painel de gestão visível

**Fluxo Principal:**
1. Admin acessa painel "Novo Usuário"
2. Admin preenche login
3. Admin preenche senha
4. Admin seleciona tipo de usuário
5. Admin seleciona setor (se tipo = operador)
6. Admin clica em "Cadastrar Usuário"
7. Sistema valida login único
8. Sistema valida campos obrigatórios
9. Sistema aplica hash na senha
10. Sistema cria registro com flag `primeiroAcesso = true`
11. Sistema registra criação em log
12. Sistema salva no localStorage
13. Sistema atualiza tabela de usuários
14. Sistema exibe toast de sucesso
15. Sistema limpa formulário

**Fluxos Alternativos:**

**FA-1: Login Duplicado**
- 7a. Login já existe no banco
- 7b. Sistema exibe toast de erro
- 7c. Retorna ao passo 2

**FA-2: Campos Vazios**
- 8a. Login ou senha vazios
- 8b. Sistema exibe toast de erro
- 8c. Retorna ao passo 2

**Pós-condições:**
- Novo usuário criado
- Registro em log
- Tabela atualizada
- Dados persistidos

---

### UC-003: Adicionar Item ao Estoque

**Ator Principal:** Admin ou Almoxarifado

**Pré-condições:**
- Usuário autenticado
- Painel de entrada visível

**Fluxo Principal:**
1. Usuário acessa painel "Entrada e Busca"
2. Usuário digita nome do item
3. Usuário define quantidade
4. Usuário clica em "Adicionar Novo Item"
5. Sistema valida campos não vazios
6. Sistema busca item existente no estoque
7. Sistema incrementa quantidade (se existe)
8. Sistema registra adição em log
9. Sistema salva no localStorage
10. Sistema atualiza quadro de estoque
11. Sistema exibe toast de sucesso
12. Sistema limpa campo de nome
13. Sistema foca campo para próxima entrada

**Fluxos Alternativos:**

**FA-1: Item Não Existe**
- 7a. Item não encontrado no estoque
- 7b. Sistema cria novo registro
- 7c. Continua fluxo normal

**FA-2: Campos Inválidos**
- 5a. Nome vazio ou quantidade < 1
- 5b. Sistema exibe toast de erro
- 5c. Retorna ao passo 2

**Pós-condições:**
- Item adicionado ou incrementado
- Log registrado
- Estoque atualizado
- Interface refletindo mudança

---

### UC-004: Solicitar Reposição de Material

**Ator Principal:** Operador de Setor

**Pré-condições:**
- Operador autenticado
- Item zerado em seu setor
- Item disponível no estoque central

**Fluxo Principal:**
1. Operador visualiza item zerado em seu setor
2. Operador clica em "Solicitar +"
3. Sistema exibe modal de solicitação
4. Sistema busca disponibilidade no estoque
5. Sistema exibe quantidade disponível
6. Sistema pré-preenche quantidade = 1
7. Operador ajusta quantidade desejada
8. Operador clica em "Enviar Pedido"
9. Sistema valida quantidade <= disponível
10. Sistema cria registro em setor "solicitacao"
11. Sistema armazena setor destino
12. Sistema registra solicitação em log
13. Sistema fecha modal
14. Sistema salva no localStorage
15. Sistema atualiza interface
16. Sistema exibe toast de sucesso

**FA-1: Estoque Insuficiente**
1. Quantidade solicitada > disponível
2. Sistema exibe toast de erro
3. Retorna ao passo 7 (ajuste da quantidade)

**FA-2: Sem Estoque**
1. Item não encontrado no estoque
2. Sistema exibe disponibilidade = 0
3. Modal permite solicitar mesmo assim (para registro)

**Pós-condições:**
- Solicitação criada
- Registro em log
- Almoxarifado pode visualizar
- Operador notificado

### UC-005: Transferir Material via Drag-and-Drop

**Ator Principal:** Admin ou Almoxarifado

**Pré-condições:**
- Usuário autenticado
- Item disponível no estoque
- Setor destino não bloqueado

**Fluxo Principal:**
1. Usuário visualiza item no estoque central
2. Usuário clica e segura o item (drag)
3. Usuário move cursor sobre setor destino
4. Sistema destaca setor com hover
5. Usuário solta item no setor (drop)
6. Sistema exibe modal de transferência
7. Sistema exibe nome do item e setor destino
8. Sistema pré-preenche quantidade = 1
9. Sistema define max = quantidade disponível
10. Usuário ajusta quantidade
11. Usuário clica em "Confirmar Envio"
12. Sistema valida quantidade
13. Sistema deduz do estoque central
14. Sistema adiciona ao setor destino (ou cria registro)
15. Sistema registra transferência em log
16. Sistema fecha modal
17. Sistema salva no localStorage
18. Sistema atualiza ambos os setores visualmente
19. Sistema exibe toast de sucesso

**Fluxos Alternativos:**

**FA-1: Setor Bloqueado**
1. Setor destino está bloqueado
2. Sistema exibe toast de erro
3. Cancela operação

**FA-2: Quantidade Inválida**
1. Quantidade < 1 ou > disponível
2. Sistema exibe toast de erro
3. Retorna ao passo 10

**FA-3: Drop em Local Inválido**
1. Usuário solta em estoque ou solicitações
2. Sistema ignora ação
3. Nenhuma alteração

**Pós-condições:**
- Material transferido
- Estoque e setor atualizados
- Log registrado
- Interface sincronizada

---

## 6. Modelo de Dados

### 6.1 Estrutura Geral

```
javascript{
  usuarios: Array<Usuario>,
  setores:  Array<Setor>,
  itens:    Array<Item>,
  logs:     Array<String>
}
```

### 6.2 Entidade: Usuario
```
javascript{
  id: String,              // Único, gerado com timestamp
  nome: String,            // Login (único)
  senha: String,           // Hash da senha
  tipo: String,            // 'admin' | 'almoxarifado' | 'setor'
  setorId: String,         // ID do setor vinculado (vazio se admin/almox)
  ip: String,              // Último IP de acesso
  mac: String,             // Device ID (identificador único)
  acesso: String,          // Data/hora do último acesso
  bloqueado: Boolean,      // Status de bloqueio
  primeiroAcesso: Boolean  // Flag de primeiro login
}
```

#### Exemplo:
```
javascript{
  id: 'u1674567890123',
  nome: 'joao.silva',
  senha: 'MTIzNDU2Nzg5MA==',
  tipo: 'setor',
  setorId: 's1674567891234',
  ip: '192.168.1.105',
  mac: 'ID-bW96aWxsYTEyMzQ1',
  acesso: '11/01/2025 14:30:45',
  bloqueado: false,
  primeiroAcesso: false
}
```

### 6.3 Entidade: Setor
```
javascript{
  id: String,       // Único, 'estoque' ou 's' + timestamp
  nome: String,     // Nome do setor
  emoji: String,    // Emoji representativo
  cor: String,      // Cor de fundo (hex)
  fixa: Boolean,    // Se é setor fixo (não move/exclui)
  ordem: Number,    // Ordem de exibição
  bloqueado: Boolean // Status de bloqueio
}
```

#### Exemplo:
```
javascript{
  id: 's1674567891234',
  nome: 'Manutenção',
  emoji: '🔧',
  cor: '#e3f2fd',
  fixa: false,
  ordem: 2,
  bloqueado: false
}
```

#### Setores Especiais:
```
javascript// Estoque Central (sempre existe)
{
  id: 'estoque',
  nome: 'Estoque Central',
  emoji: '📦',
  cor: '#f8fafc',
  fixa: true,
  ordem: 0,
  bloqueado: false
}
```
```
javascript{
// Solicitações (virtual, criado em runtime se necessário)

  id: 'solicitacao',
  nome: 'Solicitações',
  emoji: '🔔',
  cor: '#fffaf0',
  fixa: true
}
```

### 6.4 Entidade: Item
```
javascript{
  id: String,      // Único, timestamp ou 'sol-' + timestamp
  nome: String,    // Nome do item
  qtd: Number,     // Quantidade disponível
  setorId: String, // ID do setor onde está
  destino: String  // (Opcional) Setor destino (apenas para solicitações)
}
```

Exemplos:
```
javascript// Item no estoque
{
  id: '1674567892345',
  nome: 'Parafuso M6',
  qtd: 150,
  setorId: 'estoque'
}

// Item em setor
{
  id: '1674567893456',
  nome: 'Chave Phillips',
  qtd: 3,
  setorId: 's1674567891234'
}

// Solicitação
{
  id: 'sol-1674567894567',
  nome: 'Martelo',
  qtd: 2,
  setorId: 'solicitacao',
  destino: 's1674567891234'
}
```

### 6.5 Logs
```
javascript// Array de strings formatadas
[
  "[11/01/2025 14:30:45] joao.silva (IP: 192.168.1.105 | MAC: ID-bW96aWxsYTEyMzQ1): Login realizado",
  "[11/01/2025 14:32:10] joao.silva (IP: 192.168.1.105 | MAC: ID-bW96aWxsYTEyMzQ1): Solicitou 5 un de Parafuso M6",
  "[11/01/2025 14:35:22] admin (IP: 192.168.1.100 | MAC: ID-YWRtaW4xMjM0NTY3): Atendeu solicitação de 5 un de Parafuso M6"
]
```

**Formato:**
```
[DD/MM/YYYY HH:MM:SS] usuario (IP: xxx.xxx.xxx.xxx | MAC: ID-xxxxx): Ação
```

---

## 7. Regras de Negócio

### RN-001: Exclusividade de Login
- Não podem existir dois usuários com mesmo login
- Validação case-sensitive

### RN-002: Usuário Admin Indelével
- Sempre existe ao menos um admin
- Usuário 'admin' não pode ser excluído
- Outros admins podem ser criados

### RN-003: Setor Estoque Fixo
- Setor 'estoque' sempre existe
- Não pode ser editado, movido ou excluído
- Sempre primeira posição

### RN-004: Bloqueio de Setor
- Setor bloqueado impede:
  - Utilização de materiais
  - Novas solicitações
- Setor bloqueado permite:
  - Transferências admin
  - Visualização

### RN-005: Exclusão de Setor
- Só pode excluir setor sem itens (qtd > 0)
- Não pode excluir setores fixos
- Usuários vinculados ficam sem setor

### RN-006: Validação de Transferência
- Origem deve ter quantidade suficiente
- Destino não pode ser 'estoque' ou 'solicitacao'
- Destino não pode estar bloqueado
- Quantidade > 0

### RN-007: Solicitações
- Solicitação sem estoque é permitida (registro)
- Atendimento valida estoque atual
- Recusa não retorna nada ao estoque

### RN-008: Primeiro Acesso
- Todo usuário novo tem flag `primeiroAcesso = true`
- Sistema força mudança de senha no primeiro login
- Após alteração, flag vira false

### RN-009: Logs FIFO
- Mantém apenas 200 logs mais recentes
- Ao adicionar 201º, remove o mais antigo
- Ordem decrescente na exibição

### RN-010: Item Zerado
- Item com qtd = 0 não é excluído automaticamente
- Visual diferenciado (opacidade reduzida)
- Permite reposição via solicitação

### RN-011: Agregação de Itens
- Itens com mesmo nome no mesmo setor são agregados
- Comparação case-insensitive
- Quantidade é somada

### RN-012: Rastreamento Local
- IP obtido via WebRTC (conexão local)
- Device ID gerado a partir de características do navegador
- Ambos registrados a cada login

---

## 8. Interface do Usuário

### 8.1 Wireframes de Baixa Fidelidade

#### Tela de Login
```
┌────────────────────────────────────┐
│                                    │
│         🚀 Enterprise Login        │
│                                    │
│   ┌───────────────────────────┐    │
│   │ Usuário                   │    │
│   └───────────────────────────┘    │
│                                    │
│   ┌───────────────────────────┐    │
│   │ Senha            [••••••] │    │
│   └───────────────────────────┘    │
│                                    │
│   ┌───────────────────────────┐    │
│   │   Entrar no Sistema       │    │
│   └───────────────────────────┘    │
│                                    │
│   Esqueci a senha / Reset          │
│                                    │
└────────────────────────────────────┘
```

#### Dashboard Admin
```
┌────────────────────────────────────────────────────────┐
│ 🏢 Enterprise Stock v6.0    admin (admin)    [Sair]    │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ 📦 Entrada   │ │ 👥 Usuários │ │ 🛠️ Config    │    │
│  │              │ │              │ │              │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                        │
│  📦 Gestão de Estoque e Solicitações                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ┌──────────┐  ┌──────────┐                       │  │
│  │ │ Estoque  │  │Solicita. │                       │  │
│  │ │          │  │          │                       │  │
│  │ └──────────┘  └──────────┘                       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  Setores Operacionais                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ┌──────────┐  ┌──────────┐  ┌──────────┐         │  │
│  │ │ Setor 1  │  │ Setor 2  │  │ Setor 3  │         │  │
│  │ └──────────┘  └──────────┘  └──────────┘         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  📋 Gestão de Usuários e Auditoria                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Tabela de usuários...                            │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  🕒 Logs de Movimentação                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [11/01/2025 14:30] admin: Login realizado        │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

#### Dashboard Operador
```
┌────────────────────────────────────────────────────────┐
│ 🏢 Enterprise Stock v6.0  joao.silva (setor)  [Sair]   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  🔍 Pesquisar no Estoque Central                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Buscar item disponível...             [🔍]      │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Resultados da busca...                          │   │
│  └─────────────────────────────────────────────────┘   │
│                                                        │
│  Meu Setor                                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🔧 Manutenção                                   │   │
│  │ ┌─────────────────────────────────────────────┐  │  │
│  │ │ Buscar no meu setor...                      │  │  │
│  │ └─────────────────────────────────────────────┘  │  │
│  │                                                  │  │
│  │ ┌─────────────────┐  ┌─────────────────┐         │  │
│  │ │ Parafuso M6     │  │ Chave Phillips  │         │  │
│  │ │ Qtd: 15         │  │ Qtd: 0          │         │  │
│  │ │ [Utilizar]      │  │ [Solicitar +]   │         │  │
│  │ └─────────────────┘  └─────────────────┘         │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### 8.2 Paleta de Cores
```
css:root {
  --cor-fundo: #f0f2f5;       /* Cinza claro de fundo */
  --cor-primaria: #1a365d;    /* Azul escuro */
  --cor-destaque: #3182ce;    /* Azul médio */
  --cor-perigo: #e53e3e;      /* Vermelho */
  --cor-sucesso: #38a169;     /* Verde */
  --cor-alerta: #d69e2e;      /* Amarelo/laranja */
  --cor-texto: #2d3748;       /* Cinza escuro */
  --cor-borda: #e2e8f0;       /* Cinza claro de bordas */
}
```

### 8.3 Tipografia

- **Fonte Principal:** Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Tamanhos:**
  - Títulos: 1.2rem - 1.5rem
  - Corpo: 0.9rem - 1rem
  - Pequeno: 0.7rem - 0.8rem

### 8.4 Componentes Reutilizáveis

#### Cartão de Item
```
┌─────────────────────────────┐
│ Nome do Item        Qtd: 10 │
│                             │
│      [Botão Ação]           │
└─────────────────────────────┘
```

#### Modal Padrão
```
┌─────────────────────────────┐
│ Título do Modal             │
├─────────────────────────────┤
│                             │
│ Conteúdo...                 │
│                             │
│ [Input/Select]              │
│                             │
│    [Cancelar] [Confirmar]   │
└─────────────────────────────┘
```

#### Toast Notification
```
┌────────────────────────┐
│ ✓ Ação realizada!      │
└────────────────────────┘

9. Segurança
9.1 Autenticação
Método: Hash básico de senha
javascriptconst hash = (str) => btoa(str).split('').reverse().join('');
```

**Limitações Conhecidas:**
- Hash reversível (não adequado para produção)
- Sem salt
- Sem múltiplas iterações

**Recomendação para Produção:**
- Implementar bcrypt, scrypt ou PBKDF2
- Adicionar salt único por usuário
- Mínimo 10.000 iterações

### 9.2 Armazenamento

**LocalStorage:**
- Dados armazenados em texto plano (JSON)
- Acessível via DevTools
- Limitado ao domínio

**Mitigações:**
- Senhas sempre em hash
- Não armazenar dados sensíveis além das senhas
- Educação do usuário sobre segurança física

### 9.3 Rastreamento

**IP Local:**
- Obtido via WebRTC
- Não expõe IP público
- Identifica apenas rede local

**Device ID:**
- Gerado a partir de:
  - User Agent
  - Idioma
  - Plataforma
  - Resolução
  - Cores
  - Timezone
- Hash do conjunto resulta em ID único
- Muda se navegador/sistema mudarem

**Limitações:**
- Não é MAC address real (impossível via browser)
- Pode mudar com updates do navegador
- Modo anônimo gera ID diferente

### 9.4 Proteção de Dados

**Backup:**
- Responsabilidade do usuário
- Export manual recomendado
- Sem sincronização automática

**Perda de Dados:**
- Limpeza de cache = perda total
- Sem recuperação possível
- Documentar procedimentos de backup

---

## 10. Considerações Técnicas

### 10.1 Arquitetura
```
┌─────────────────────────────────────┐
│         Camada de Apresentação      │
│              (HTML/CSS)             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Camada de Lógica (JS)         │
│  ┌──────────────────────────────┐   │
│  │  Autenticação                │   │
│  ├──────────────────────────────┤   │
│  │  Controle de Permissões      │   │
│  ├──────────────────────────────┤   │
│  │  Lógica de Negócio           │   │
│  ├──────────────────────────────┤   │
│  │  Gerenciamento de Estado     │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Camada de Persistência         │
│        (LocalStorage API)           │
└─────────────────────────────────────┘
```

### 10.2 Fluxo de Dados
```
Ação do Usuário
      │
      ▼
Validação de Permissão
      │
      ▼
Lógica de Negócio
      │
      ▼
Atualização do Estado (db)
      │
      ▼
Persistência (LocalStorage)
      │
      ▼
Atualização da Interface
      │
      ▼
Feedback Visual (toast)
```

### 10.3 Detecção de IP Local
```
Tecnologia: WebRTC
javascriptasync function obterInfoRede() {
  const pc = new RTCPeerConnection({ iceServers: [] });
  pc.createDataChannel('');
  
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  return new Promise((resolve) => {
    pc.onicecandidate = (ice) => {
      if (ice && ice.candidate) {
        // Extrai IP do candidate
        const ip = ice.candidate.candidate.split(' ')[4];
        resolve(ip);
      }
    };
  });
}
```

**Processo:**
- Cria conexão peer fictícia
- Gera oferta ICE
- Captura candidates
- Extrai IP local do candidate
- Fecha conexão

### 10.4 Geração de Device ID
```
javascriptconst navegadorInfo = {
  userAgent: navigator.userAgent,
  idioma: navigator.language,
  plataforma: navigator.platform,
  cores: screen.colorDepth,
  resolucao: `${screen.width}x${screen.height}`,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};

const deviceId = btoa(JSON.stringify(navegadorInfo)).substring(0, 17);
const mac = `ID-${deviceId}`;
```

## 11. Glossário
**Termo Definição** 
- Almoxarifado Usuário: responsável pela gestão do estoque central e distribuição de materiais
- ArtifactComponente: visual reutilizável da interface
- CartãoElemento: visual que representa um item no sistema
- Device ID: Identificador único gerado a partir de características do dispositivo navegador
- Drag-and-Drop: Ação de arrastar e soltar elementos na interface
- FIFO: First In, First Out - primeiro a entrar, primeiro a sair
- Hash: Função que transforma texto em valor codificado
- LocalStorage: API do navegador para armazenamento local de dados
- Modal: Janela sobreposta à interface principal para ações específicas
- Operador: Usuário vinculado a um setor específico com permissões limitadas
- Setor: Divisão organizacional que recebe e utiliza materiais
- Solicitação: Pedido de reposição de material feito por operador
- Toast: Notificação temporária exibida na interface
- WebRTC: Tecnologia para comunicação em tempo real via navegador


# ✅ Checklist de Implementação
## Estrutura Base

- Criar index.html com estrutura completa 
- Criar styles.css com variáveis e reset 
- Criar app.js com estrutura modular 
- Implementar LocalStorage wrapper

# Documentação
- README.md completo 
- Comentários no código 
- Este documento Levantamentos de requisitos
- Doccumentos adcionais de engenharia

