
## 6. 📝 Documento de Arquitetura de Software (DAS)

### 6.1 Visão Geral Arquitetural

**Padrão:** Camadas (Layered Architecture)

```
┌─────────────────────────────────────┐
│     CAMADA DE APRESENTAÇÃO          │
│   (HTML, CSS, Interface Visual)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     CAMADA DE APLICAÇÃO             │
│  (Lógica de Negócio, Controladores) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│     CAMADA DE PERSISTÊNCIA          │
│     (LocalStorage Wrapper)          │
└─────────────────────────────────────┘
```

### 6.2 Decisões Arquiteturais

#### DA-01: Single Page Application (SPA)
**Decisão:** Implementar como SPA sem frameworks  
**Justificativa:** Simplicidade, zero dependências, carregamento rápido  
**Alternativas Rejeitadas:** React, Vue (complexidade desnecessária)

#### DA-02: LocalStorage para Persistência
**Decisão:** Usar LocalStorage nativo  
**Justificativa:** Funciona offline, API simples, suporte universal  
**Alternativas Rejeitadas:** IndexedDB (complexo), WebSQL (deprecated)

#### DA-03: Vanilla JavaScript
**Decisão:** JavaScript puro sem frameworks  
**Justificativa:** Zero dependências, performance, controle total  
**Alternativas Rejeitadas:** jQuery (desnecessário), frameworks (overkill)

#### DA-04: CSS Puro com Variáveis
**Decisão:** CSS3 com variáveis CSS nativas  
**Justificativa:** Sem preprocessadores, fácil manutenção  
**Alternativas Rejeitadas:** SASS/LESS (build step), Tailwind (CDN)

### 6.3 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────┐
│                     APP.JS                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │  Autenticação   │  │  Controle de    │           │
│  │                 │  │  Permissões     │           │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │  Gestão de      │  │  Gestão de      │           │
│  │  Usuários       │  │  Setores        │           │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │  Gestão de      │  │  Sistema de     │           │
│  │  Estoque        │  │  Solicitações   │           │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │  Transferências │  │  Auditoria      │           │
│  │                 │  │  e Logs         │           │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐           │
│  │  Renderização   │  │  Persistência   │           │
│  │  de Interface   │  │  (LocalStorage) │           │
│  └─────────────────┘  └─────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6.4 Padrões de Design Utilizados

#### Singleton
```javascript
// Estado global único da aplicação
let db = {
  usuarios: [],
  setores: [],
  itens: [],
  logs: []
};
```

#### Observer (Manual)
```javascript
// Atualiza interface quando estado muda
function salvar() {
  localStorage.setItem('key', JSON.stringify(db));
  atualizarInterface(); // Notifica "observers"
}
```

#### Factory (Implícito)
```javascript
// Cria elementos DOM dinamicamente
function criarCartaoItem(item) {
  const cartao = document.createElement('div');
  // ... configuração
  return cartao;
}
```

#### Strategy
```javascript
// Comportamento diferente por perfil
if (userLogado.tipo === 'admin') {
  // Estratégia admin
} else if (userLogado.tipo === 'almoxarifado') {
  // Estratégia almoxarifado
} else {
  // Estratégia operador
}
```