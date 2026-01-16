## 7. 📝 Padrões de Codificação

### 7.1 Nomenclatura

**Variáveis e Funções:**
```javascript
// camelCase
let userLogado;
function realizarLogin() {}
```

**Constantes:**
```javascript
// UPPER_SNAKE_CASE
const MAX_LOGS = 200;
const SETOR_ESTOQUE_ID = 'estoque';
```

**Classes CSS:**
```css
/* kebab-case */
.card-controle {}
.btn-primario {}
```

### 7.2 Estrutura de Funções

```javascript
/**
 * Breve descrição da função
 * 
 * @param {Type} param - Descrição do parâmetro
 * @returns {Type} Descrição do retorno
 */
function nomeDaFuncao(param) {
  // Validações
  if (!param) {
    return toast("Erro!", "erro");
  }
  
  // Lógica principal
  const resultado = processarParam(param);
  
  // Efeitos colaterais
  salvar();
  atualizarInterface();
  
  // Retorno
  return resultado;
}
```
### 7.3 Comentários

**Seções:**
```javascript
// ============================================
// NOME DA SEÇÃO
// ============================================
```

**Funções:**
```javascript
/**
 * Descrição detalhada do que a função faz
 */
```

**Inline:**
```javascript
// Explicação de lógica complexa
const resultado = calculo(); // Comentário curto
```

### 7.4 Indentação e Formatação

- **Indentação:** 4 espaços
- **Linha máxima:** 120 caracteres
- **Ponto-e-vírgula:** Obrigatório
- **Aspas:** Simples para strings ('texto')
- **Blocos:** Sempre com chaves, mesmo para linhas únicas

```javascript
// ✅ Correto
if (condicao) {
    fazAlgo();
}

// ❌ Incorreto
if (condicao)
    fazAlgo();
```