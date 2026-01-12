# 📝 Manual do Usuário  
**Sistema de Estoque Enterprise**  
**Público-alvo:** Almoxarifado

**Objetivo:** Orientar o responsável pelo almoxarifado a gerenciar o estoque central, atender solicitações, realizar transferências e manter o controle eficiente dos materiais.

**Importante:**  
O sistema funciona 100% offline no navegador.  
Faça logout ao finalizar o uso em computadores compartilhados.  
Todos os dados são salvos apenas localmente (no navegador/computador).

---

## Sumário

1. Como fazer Login  
2. Tela principal do Almoxarifado  
3. Como adicionar materiais ao Estoque Central  
4. Como atender solicitações de setores  
5. Como transferir materiais para setores (Drag & Drop)  
6. Como resgatar materiais de setores  
7. Como bloquear/desbloquear setores  
8. Dicas importantes  
9. O que fazer em caso de problema  

---

### 1. Como fazer Login

1. Abra o navegador (recomendado: Chrome, Edge ou Firefox atualizado)
2. Acesse o sistema
3. Digite seu **usuário** e **senha**
4. Clique em **Entrar no Sistema**
5. No primeiro acesso: crie uma nova senha quando solicitado

---

### 2. Tela principal do Almoxarifado

Após o login você verá:

- Seu nome e perfil "Almoxarifado" no topo
- Botão **[Sair]** no canto superior direito
- Abas ou seções principais:
  - **Estoque Central** (entrada e busca de materiais)
  - **Solicitações** (pedidos pendentes dos setores)
  - **Setores Operacionais** (visão de todos os setores)
  - **Logs/Auditoria** (visível apenas para administradores, mas pode ser consultado indiretamente)

---

### 3. Como adicionar materiais ao Estoque Central

1. Na seção **Estoque Central** ou **Entrada**
2. Preencha os campos:
   - **Nome do material** (ex: Parafuso M6, Fita Isolante)
   - **Quantidade** (número inteiro > 0)
3. Clique em **Adicionar** ou **Confirmar Entrada**
4. O material será adicionado ou a quantidade será incrementada se já existir
5. Uma mensagem de sucesso (toast verde) aparece

**Dica:** Para adicionar rapidamente várias unidades do mesmo item, repita o processo ou use o botão **+1** ao lado do item existente.

---

### 4. Como atender solicitações de setores

1. Vá até a seção **Solicitações** (ícone de sino 🔔 ou aba específica)
2. Veja a lista de pedidos pendentes
3. Para cada solicitação:
   - Verifique o **material**, **quantidade solicitada** e **setor de destino**
   - Confira se há **saldo suficiente** no estoque central
4. Clique em **Atender**
5. Na janela que abrir:
   - Confirme ou ajuste a quantidade a ser enviada (pode ser parcial)
   - Clique em **Confirmar Atendimento**
6. O sistema:
   - Deduz automaticamente do estoque central
   - Adiciona ao setor solicitado
   - Remove a solicitação da lista
   - Registra a ação no log

**Para recusar:**
- Clique em **Recusar**
- Opcionalmente informe o motivo
- A solicitação será removida sem afetar o estoque

---

### 5. Como transferir materiais para setores (Drag & Drop)

**Método recomendado (mais rápido):**

1. No **Estoque Central**, localize o material desejado
2. Clique e segure (ou toque longo no celular) no cartão do material
3. Arraste até o setor de destino desejado
4. Solte o mouse (drop)
5. Uma janela abrirá automaticamente:
   - Mostra o material e o setor destino
   - Quantidade sugerida = 1 (ajuste conforme necessário)
6. Informe a **quantidade** a transferir
7. Clique em **Confirmar Envio**
8. O sistema realiza a transferência e mostra confirmação

**Método alternativo (botão):**
- Clique no botão **Transferir** ou **Enviar** no item
- Selecione o setor destino
- Informe a quantidade
- Confirme

---

### 6. Como resgatar materiais de setores (retornar ao estoque central)

1. Vá até o setor que possui o material
2. Localize o item desejado
3. Clique no botão **Resgatar** ou **Retornar**
4. Informe a quantidade a ser devolvida
5. Confirme a operação
6. O sistema:
   - Diminui a quantidade no setor
   - Adiciona ao Estoque Central
   - Registra a devolução no log

---

### 7. Como bloquear/desbloquear setores

1. Na visão geral dos **Setores Operacionais**
2. Localize o setor desejado
3. Clique no ícone de cadeado (🔓 / 🔒) ao lado do nome do setor
4. Confirme a ação no pop-up
5. O setor ficará bloqueado (não permite consumo nem novas solicitações) ou desbloqueado

**Efeito do bloqueio:**
- Operadores não conseguem utilizar materiais
- Novas solicitações ficam impedidas
- Transferências administrativas ainda são permitidas

---

### 8. Dicas importantes

- Sempre verifique o **saldo real** antes de atender solicitações
- Use o **drag & drop** para transferências rápidas — é o método mais ágil
- Registre **todas** as movimentações no sistema (entrada, saída, transferência, resgate)
- Atualize a página (F5) se perceber que alguma informação não atualizou
- Mantenha os logs visíveis para acompanhamento de movimentações recentes
- Oriente os operadores a registrarem imediatamente o consumo após receberem materiais
- Faça backup periódico dos dados (exportação JSON) — converse com o administrador

---

### 9. O que fazer em caso de problema

| Situação                                      | O que fazer                                      | Quem contactar          |
|-----------------------------------------------|--------------------------------------------------|--------------------------|
| Solicitação não aparece                       | Atualize a página (F5)                           | —                        |
| Material não deduziu após atendimento         | Verifique se confirmou corretamente              | Administrador            |
| Setor bloqueado por engano                    | Desbloqueie imediatamente                        | —                        |
| Sistema lento ou não salva                    | Verifique espaço no LocalStorage                 | Administrador            |
| Preciso resetar algo                          | Use apenas com muita cautela e confirmação       | Administrador            |
| Dúvida sobre movimentação registrada          | Consulte os logs recentes                        | Administrador            |

---

**Boa gestão do almoxarifado!**  
Seu trabalho é fundamental para manter o controle e o fluxo correto de materiais em todos os setores.

Qualquer dúvida grave, contate o **Administrador** do sistema.