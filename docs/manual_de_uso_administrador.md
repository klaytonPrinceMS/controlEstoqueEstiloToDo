# 📝 Manual do Usuário  
**Sistema de Estoque Enterprise**  
**Público-alvo:** Administrador

**Objetivo:** Orientar o administrador do sistema a realizar configurações completas, gerenciar usuários, setores, resetar o sistema, visualizar auditoria e ter controle total sobre todas as funcionalidades.

**Importante:**  
O sistema funciona 100% offline no navegador.  
Como administrador, você tem **acesso total**. Use com responsabilidade.  
Faça logout ao finalizar o uso em computadores compartilhados.

---

## Sumário

1. Como fazer Login  
2. Tela principal do Administrador  
3. Gerenciamento de Usuários  
4. Gerenciamento de Setores  
5. Visualização e gerenciamento da Auditoria (Logs)  
6. Reset e restauração do sistema  
7. Dicas importantes  
8. O que fazer em caso de problema  

---

### 1. Como fazer Login

1. Abra o navegador (recomendado: Chrome, Edge ou Firefox atualizado)
2. Acesse o sistema
3. Digite seu **usuário** (geralmente "admin" na primeira vez) e **senha**
4. Clique em **Entrar no Sistema**
5. No primeiro acesso (ou após reset):  
   - O sistema solicitará a criação de uma nova senha  
   - Defina uma senha forte e confirme

---

### 2. Tela principal do Administrador

Após o login você terá acesso a todas as áreas:

- Seu nome e perfil **Administrador** no topo
- Botão **[Sair]** no canto superior direito
- Painéis principais:
  - **Entrada e Busca** → Adicionar materiais ao estoque
  - **Usuários** → Gerenciar todos os usuários
  - **Setores** → Criar, editar, ordenar, bloquear setores
  - **Estoque e Solicitações** → Visão completa + atender pedidos
  - **Auditoria / Logs** → Ver todas as movimentações
  - **Configurações / Reset** → Opções avançadas de restauração

---

### 3. Gerenciamento de Usuários

**Criar novo usuário:**
1. Vá até **Usuários** → **Novo Usuário**
2. Preencha:
   - Login (único)
   - Senha inicial (o usuário mudará no primeiro acesso)
   - Tipo: Administrador, Almoxarifado ou Setor
   - Se for "Setor": selecione o setor vinculado
3. Clique em **Cadastrar**
4. O usuário será criado com flag de primeiro acesso ativada

**Outras ações:**
- **Bloquear/Desbloquear** → Clique no ícone de cadeado ao lado do usuário
- **Resetar senha** → Define uma senha temporária (usuário deve alterar no próximo login)
- **Excluir** → Só pode excluir usuários que não sejam o "admin" principal (confirmação dupla)
- Veja status: Último acesso, IP, Device ID, bloqueado/ativo

---

### 4. Gerenciamento de Setores

**Criar novo setor:**
1. Vá até **Setores** → **Novo Setor**
2. Preencha:
   - Nome
   - Emoji (opcional)
   - Cor de fundo (opcional)
3. Clique em **Criar**
4. O setor aparece na lista com ordem automática

**Editar ou reordenar:**
- Clique no setor → edite nome, emoji ou cor
- Arraste e solte (drag & drop) para mudar a ordem de exibição

**Bloquear/Desbloquear:**
- Clique no ícone de cadeado no setor
- Setor bloqueado: impede uso e novas solicitações pelos operadores

**Excluir setor:**
- Só pode excluir se estiver vazio (nenhum item com qtd > 0)
- Setor "Estoque Central" nunca pode ser excluído

---

### 5. Visualização e gerenciamento da Auditoria (Logs)

1. Vá até a seção **Auditoria** ou **Logs**
2. Veja a lista completa (mais recente primeiro)
   - Cada linha contém: data/hora, usuário, IP local, Device ID, ação realizada
3. Use a barra de rolagem para ver histórico (mantém até 200 entradas recentes)

**Dica:**  
Os logs registram **todas** as ações críticas: logins, criações, transferências, solicitações, consumos, resets, etc.  
É a principal ferramenta de rastreabilidade do sistema.

---

### 6. Reset e restauração do sistema

**Reset total (emergência):**
- Na tela de login → clique no link discreto **Reset de Emergência** (geralmente no rodapé)
- Confirmação dupla
- Limpa **todo o LocalStorage** → sistema volta ao estado inicial (apenas usuário admin padrão)

**Reset mantendo estrutura (dentro do sistema):**
1. Vá até **Configurações** → **Reset do Sistema**
2. Escolha a opção:
   - Limpar apenas itens e setores (mantém usuários)
   - Limpar tudo exceto usuário admin
3. Confirmação múltipla
4. Sistema limpa os dados selecionados e recarrega

**Atenção:**  
Reset apaga **todos** os dados locais.  
Faça backup (exportação JSON) antes se necessário.

---

### 7. Dicas importantes

- Use o **drag & drop** para transferências rápidas (mais eficiente)
- Oriente os operadores a **registrarem o consumo imediatamente** após receberem materiais
- Verifique periodicamente os **logs** para detectar padrões ou problemas
- Mantenha o usuário **admin** sempre protegido (não exclua nem bloqueie)
- Faça backup manual (exportar JSON do LocalStorage) com frequência
- Em caso de muitos itens → considere excluir itens zerados antigos
- Teste em modo mobile ocasionalmente para garantir usabilidade

---

### 8. O que fazer em caso de problema

| Situação                                      | Ação imediata                                    | Observação / Quem contactar |
|-----------------------------------------------|--------------------------------------------------|-----------------------------|
| Esqueci senha do admin                        | Use reset de emergência na tela de login         | Cuidado: apaga todos os dados |
| Usuário admin excluído por engano             | Reset total → recria admin padrão                | Perda total de dados |
| Sistema não salva alterações                  | Verifique quota do LocalStorage                  | Limpar itens antigos |
| Logs estão muito grandes / lentos             | Reset parcial (manter usuários)                  | — |
| Erro inesperado no drag & drop                | Atualize página (F5)                             | — |
| Preciso restaurar backup                      | Importar JSON manualmente (via DevTools ou função) | Administrador avançado |
| Dúvida sobre alguma movimentação              | Consulte os logs detalhadamente                  | — |

---

**Você é o guardião do sistema.**  
Com poder total vem grande responsabilidade.  
Mantenha o controle, a rastreabilidade e a segurança dos dados.

Boa administração!

Qualquer problema crítico: utilize o reset de emergência como último recurso.