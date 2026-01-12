# 🏢 Sistema de Estoque Enterprise v6.0

Sistema completo de gestão de estoque multi-setorial com controle de usuários, auditoria e rastreamento de movimentações.

![Version](https://img.shields.io/badge/version-6.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura de Permissões](#-estrutura-de-permissões)
- [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Segurança](#-segurança)
- [FAQ](#-faq)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🚀 Características

### ✨ Principais Funcionalidades

- **Sistema Multi-Usuário** com 3 níveis de permissão
- **Gestão Completa de Estoque** centralizado
- **Sistema de Solicitações** entre setores
- **Transferência de Materiais** via drag-and-drop
- **Auditoria Completa** com logs detalhados
- **Bloqueio de Setores** para controle de acesso
- **Rastreamento Local** (IP + Device ID)
- **Interface Responsiva** para desktop e mobile
- **100% Offline** - sem dependências externas
- **Busca e Filtros** avançados

---

## 🛠 Tecnologias

### Stack Técnico

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis CSS
- **JavaScript Vanilla** - Lógica pura, sem frameworks
- **LocalStorage** - *Persistência de dados local*    -- Recomenda-se implementação de Bd local para disponibilidade com servidores
- **WebRTC** - *Detecção de IP local (sem APIs externas)*    -- Atualmente utiliza identificador unico, com base no User Agent, Idioma, Plataform, Resolução de tela, Profundidade de cores e Timezone

### Características Técnicas

- ✅ Zero dependências externas
- ✅ Sem necessidade de servidor
- ✅ Funciona 100% offline
- ✅ Compatível com navegadores modernos
- ✅ Mobile-first design

---

## 📦 Instalação

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Nenhum software adicional necessário

### Passos de Instalação

1. **Clone ou baixe o repositório:**
```bash
git clone https://github.com/seu-usuario/enterprise-stock.git
cd enterprise-stock
```

2. **Estrutura de arquivos necessária:**
```
enterprise-stock/
│
├── .gitatributes      
├── app.js                             # Lógica da aplicação
├── index.html                         # Arquivo principal
├── LICENSE                            # Definição da licença MIT
├── README.md                          # Documentação
├── styles.css                         # Estilos
├── bExmplos\                          # Pasta de backup com exemplos dos processos de criação, versões antigas pronto para rodar
├── bExmplos\index(n)                  # versões em codigo unico
├── bExmplos\indexSeparado(n)          # versões dos arquivos semparados
├── bExmplos\appSeparados(n)           # versões dos arquivos semparados
└── bExmplos\stylesSeparado(n)         # versões dos arquivos semparados
```

3. **Abra o sistema:**
   - Abra o arquivo `index.html` diretamente no navegador
   - Ou use um servidor local (ex: Live Server do VS Code)

4. **Credenciais padrão:**
   - **Usuário:** `admin`
   - **Senha:** `admin`

> ⚠️ **IMPORTANTE:** Altere a senha padrão no primeiro acesso!

---

## 💻 Uso

### Primeiro Acesso

1. Acesse o sistema com as credenciais padrão
2. O sistema solicitará a criação de uma nova senha
3. Configure os setores necessários
4. Crie os usuários operacionais

### Workflow Básico

```
┌─────────────┐
│   ADMIN     │ Cria setores e usuários
└──────┬──────┘
       │
┌──────▼──────────┐
│  ALMOXARIFADO   │ Gerencia estoque central
└──────┬──────────┘
       │
       │ Atende solicitações
       │
┌──────▼──────────┐
│  OPERADOR SETOR │ Solicita e utiliza materiais
└─────────────────┘
```

---

## 👥 Estrutura de Permissões

### 🔴 Administrador (Admin)

**Acesso Total ao Sistema**

- ✅ Criar/editar/excluir usuários
- ✅ Criar/editar/excluir setores
- ✅ Bloquear/desbloquear setores
- ✅ Gerenciar estoque central
- ✅ Visualizar auditoria completa
- ✅ Resgatar itens de setores
- ✅ Resetar sistema
- ✅ Visualizar logs detalhados

### 🟡 Almoxarifado

**Gestão de Estoque e Distribuição**

- ✅ Adicionar itens ao estoque
- ✅ Atender solicitações
- ✅ Transferir materiais entre setores
- ✅ Resgatar itens de setores
- ✅ Visualizar todos os setores
- ❌ Gerenciar usuários
- ❌ Visualizar auditoria
- ❌ Resetar sistema

### 🟢 Operador de Setor

**Operações Básicas do Setor**

- ✅ Visualizar apenas seu setor
- ✅ Buscar itens no estoque central
- ✅ Solicitar reposição de materiais
- ✅ Utilizar itens do setor
- ❌ Transferir para outros setores
- ❌ Gerenciar usuários
- ❌ Criar setores

---

## 🎯 Funcionalidades Detalhadas

### 📦 Gestão de Estoque

#### Adicionar Item
```javascript
// Admin/Almoxarifado pode adicionar itens
1. Digite o nome do item
2. Defina a quantidade
3. Clique em "Adicionar Novo Item"
```

#### Buscar Item
```javascript
// Busca em tempo real
- Digite parte do nome do item
- Resultados aparecem automaticamente
```

### 🔄 Sistema de Solicitações

#### Fluxo de Solicitação
```
Operador → Solicita Item → Almoxarifado → Aprova/Recusa
```

#### Tipos de Solicitação
1. **Reposição:** Item zerado no setor
2. **Nova aquisição:** Busca no estoque central

### 🚚 Transferência de Materiais

#### Drag and Drop
```
1. Arraste item do Estoque Central
2. Solte no setor desejado
3. Defina quantidade
4. Confirme transferência
```

#### Resgate de Materiais
```javascript
// Admin/Almoxarifado pode resgatar itens
- Clique em "Resgatar" no item
- Defina quantidade
- Item retorna ao estoque central
```

### 🔒 Controle de Setores

#### Bloqueio de Setor
```
Setor Bloqueado:
- ❌ Não permite utilização de itens
- ✅ Admin pode desbloquear
```

#### Reordenação
```
- Arraste setores para reorganizar
- Ordem é salva automaticamente
- Apenas setores não-fixos podem mover
```

### 📊 Auditoria e Logs

#### Informações Registradas
```javascript
[Data/Hora] Usuário (IP: xxx.xxx.xxx.xxx | MAC: ID-xxxxx): Ação
```

#### Eventos Rastreados
- Login/Logout
- Criação de usuários
- Modificação de setores
- Movimentação de itens
- Transferências
- Solicitações
- Bloqueios

#### Retenção de Logs
- Últimos **200 registros**
- FIFO (First In, First Out)

---

## 📁 Estrutura de Arquivos

### index.html
```html
<!-- Interface principal -->
- Tela de login
- Header com informações do usuário
- Painéis administrativos
- Quadro de setores
- Modais de ação
- Sistema de notificações
```

### app.js
```javascript
// Módulos principais
├── Segurança e Hash
├── Estado do Sistema (db)
├── Detecção de Rede Local
├── Autenticação
├── Interface (render)
├── Lógica de Negócio
├── Gestão de Usuários
├── Gestão de Setores
└── Utilitários
```

### styles.css
```css
/* Organização */
├── Variáveis CSS
├── Reset Global
├── Tela de Login
├── Header
├── Containers
├── Setores (Colunas)
├── Cartões de Itens
├── Tabelas
├── Botões
├── Modais
├── Notificações
└── Responsividade
```

---

## 🔐 Segurança

### Autenticação

```javascript
// Hash básico de senhas
const hash = (str) => btoa(str).split('').reverse().join('');
```

> ⚠️ **Nota:** Este é um hash básico para ambiente de desenvolvimento. Para produção, recomenda-se implementar bcrypt ou similar.

### Rastreamento

#### IP Local
```javascript
// Obtido via WebRTC (sem APIs externas)
- Identifica rede local
- Não expõe IP público
```

#### Device ID
```javascript
// Gerado a partir de características do navegador
- User Agent
- Idioma
- Plataforma
- Resolução de tela
- Profundidade de cores
- Timezone
```

### Armazenamento

```javascript
// LocalStorage
- Dados criptografados com hash básico
- Backup manual recomendado
- Limpeza via "Reset de Sistema"
```

---

## ❓ FAQ

### **P: Como fazer backup dos dados?**
**R:** Os dados estão no LocalStorage. Use as ferramentas do navegador (F12 > Application > LocalStorage) para exportar o JSON. Implemente função de export/import se necessário.

### **P: Posso usar em rede local?**
**R:** Sim! Hospede em servidor web local (Apache, Nginx, ou Node.js) e acesse via IP da rede.

### **P: Funciona offline?**
**R:** 100%! Não há dependências externas. Tudo funciona localmente.

### **P: Como recuperar senha de admin?**
**R:** Use o botão "Reset de Fábrica" na tela de login. Isso resetará o usuário admin para admin/admin.

### **P: Quantos usuários suporta?**
**R:** Ilimitado! A performance depende do navegador e dispositivo.

### **P: Posso personalizar as cores?**
**R:** Sim! Edite as variáveis CSS em `styles.css` (`:root`).

### **P: Como adicionar mais níveis de permissão?**
**R:** Modifique o select em `index.html` e adicione lógica condicional em `app.js`.

### **P: Há limite de itens no estoque?**
**R:** Tecnicamente não, mas o LocalStorage tem limite de ~5-10MB por domínio.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. **Fork o projeto**
2. **Crie uma branch** (`git checkout -b feature/MinhaFeature`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push para a branch** (`git push origin feature/MinhaFeature`)
5. **Abra um Pull Request**

### Guidelines

- Mantenha o código limpo e comentado
- Siga os padrões existentes
- Teste todas as funcionalidades
- Atualize a documentação

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma issue com:

- **Título descritivo**
- **Passos para reproduzir**
- **Comportamento esperado vs atual**
- **Screenshots (se aplicável)**
- **Navegador e versão**

---

## 📝 Roadmap

### Versão 6.1 (Planejado)
- [ ] Export/Import de dados (JSON)
- [ ] Relatórios em PDF
- [ ] Gráficos de consumo
- [ ] Notificações de estoque baixo
- [ ] Modo escuro
- [ ] Multi-idioma

### Versão 7.0 (Futuro)
- [ ] Backend opcional (Node.js)
- [ ] Sincronização em nuvem
- [ ] App mobile nativo
- [ ] Integração com leitor de código de barras
- [ ] Sistema de alertas por email

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2025 Enterprise Stock System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contato

**Autor:** PRINCE, K.B  
**Email:** klayton.prince.ms@gmail.com  
**GitHub:** [@klaytonPrinceMS](https://github.com/klaytonPrinceMS)

---

## 🌟 Agradecimentos

Agradecimentos especiais a todos que contribuíram para o desenvolvimento deste sistema.

---

<div align="center">

**[⬆ Voltar ao Topo](#-sistema-de-estoque-enterprise-v60)**

Feito com ❤️ para gestão eficiente de estoques

</div>