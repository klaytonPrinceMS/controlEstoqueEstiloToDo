### UC-004: Solicitar Reposição de Material (continuação)

**Fluxos Alternativos:**

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

```javascript
{
  usuarios: Array<Usuario>,
  setores:  Array<Setor>,
  itens:    Array<Item>,
  logs:     Array<String>
}