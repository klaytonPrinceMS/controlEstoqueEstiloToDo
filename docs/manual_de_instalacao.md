# 📦 Manual de Instalação  
**Sistema de Estoque Enterprise**

**Objetivo:**  
Orientar o usuário (geralmente o administrador de TI ou responsável técnico) a instalar e colocar em funcionamento o sistema de forma rápida e segura em qualquer computador ou ambiente corporativo.

**Data:** Janeiro 2026  
**Requisitos mínimos:**  
- Computador com Windows, macOS ou Linux  
- Navegador moderno: Google Chrome (versão 90+), Microsoft Edge (90+), Firefox (88+) ou Safari (14+)  
- Nenhum servidor, banco de dados ou conexão com internet é necessário

---

## Sumário

1. O que é necessário para instalar  
2. Opções de instalação  
   2.1. Instalação local (mais simples – recomendada)  
   2.2. Instalação em rede compartilhada (para múltiplos computadores)  
3. Passo a passo de instalação local  
4. Primeira execução e configuração inicial  
5. Como atualizar o sistema  
6. Como fazer backup e restauração  
7. Solução de problemas comuns  
8. Recomendações finais

---

### 1. O que é necessário para instalar

- **Arquivo do sistema** → Um único arquivo ZIP contendo:
  - `index.html`
  - `styles.css`
  - `app.js` (ou pasta com arquivos JS separados)
  - (opcionalmente) `assets/` com imagens/ícones
- **Espaço em disco** → Menos de 2 MB
- **Permissões** → Apenas ler/escrever em uma pasta qualquer do computador

**Não é necessário:**
- Instalar programas adicionais
- Configurar servidor web
- Ter conexão com internet
- Criar banco de dados

---

### 2. Opções de Instalação

#### 2.1 Instalação local (recomendada para uso individual ou teste)

- Ideal para um único computador ou operador  
- Os dados ficam salvos apenas naquele navegador/computador

#### 2.2 Instalação em rede compartilhada (para múltiplos usuários)

- Colocar os arquivos em uma pasta compartilhada na rede (ex: servidor de arquivos)  
- Cada usuário acessa pelo caminho de rede (\\servidor\pasta\index.html)  
- Cada computador mantém seu próprio LocalStorage → **não há sincronização automática**  
- Recomendado apenas se todos os computadores tiverem acesso à mesma pasta e backup centralizado

**Atenção:** O sistema não sincroniza dados entre máquinas automaticamente. Cada máquina tem seu próprio banco de dados local.

---

### 3. Passo a passo de instalação local

1. **Receba o pacote**  
   - O administrador de TI entrega o arquivo ZIP (ex: `EstoqueEnterprise.zip`)

2. **Descompacte o arquivo**  
   - Clique com botão direito → Extrair tudo  
   - Escolha uma pasta fixa e de fácil acesso, exemplo:
     - `C:\Programas\EstoqueEnterprise\`
     - `D:\Sistemas\Estoque\`
     - `/Users/seuusuario/Sistemas/EstoqueEnterprise/` (macOS)

3. **Abra o sistema pela primeira vez**  
   - Navegue até a pasta descompactada  
   - Dê duplo clique no arquivo **`index.html`**  
   - O navegador abrirá automaticamente o sistema

4. **Crie um atalho (opcional – recomendado)**  
   - Clique com botão direito em `index.html` → Criar atalho  
   - Renomeie para “Estoque Enterprise”  
   - Arraste o atalho para a Área de Trabalho ou Fixar na barra de tarefas

---

### 4. Primeira execução e configuração inicial

1. Ao abrir pela primeira vez, você verá a tela de login
2. Use as credenciais iniciais (fornecidas pelo administrador):
   - Usuário: `admin`
   - Senha: senha padrão (geralmente informada no pacote ou por e-mail)
3. No primeiro acesso do admin:
   - O sistema solicitará a criação de uma **nova senha** (obrigatória)
   - Digite e confirme a nova senha
4. Após isso, crie os outros usuários, setores e comece a cadastrar materiais

**Dica:** Altere a senha do admin imediatamente e guarde-a em local seguro.

---

### 5. Como atualizar o sistema

Quando houver uma nova versão:

1. Receba o novo ZIP do desenvolvedor/administrador
2. Faça backup do banco de dados atual (veja item 6)
3. Descompacte o novo ZIP na mesma pasta (substitua os arquivos existentes)
4. Abra novamente o `index.html`
5. O sistema carregará com a nova versão
   - Os dados existentes (usuários, itens, logs) são mantidos no LocalStorage

**Importante:** Sempre faça backup antes de atualizar.

---

### 6. Como fazer backup e restauração

**Backup (exportar dados):**
1. Abra o sistema como administrador
2. Vá em Configurações → Exportar Dados (ou use a função de backup disponível)
3. Salve o arquivo JSON em local seguro (pen drive, nuvem, servidor)

**Restauração (importar dados):**
1. Abra o sistema
2. Vá em Configurações → Importar Dados
3. Selecione o arquivo JSON de backup
4. Confirme a importação → os dados serão restaurados

**Alternativa manual (se a função não estiver disponível):**
- Abra DevTools (F12) → Application → Local Storage → copie o conteúdo da chave do sistema  
- Cole em um arquivo JSON novo

---

### 7. Solução de problemas comuns

| Problema                                      | Solução possível                                                                 |
|-----------------------------------------------|----------------------------------------------------------------------------------|
| O sistema não abre (tela branca)              | Verifique se está abrindo o `index.html` diretamente (não via servidor)         |
| Dados não salvam / "Quota exceeded"           | Limpe itens zerados antigos ou faça reset parcial (mantendo usuários)           |
| Funcionalidades não aparecem                  | Limpe o cache do navegador (Ctrl + Shift + R)                                   |
| Login não funciona                            | Use reset de emergência (tela de login) – apaga tudo e volta ao padrão         |
| Drag & drop não funciona no celular           | Use computador para transferências; mobile tem suporte limitado                 |
| Preciso usar em vários computadores           | Instale em pasta compartilhada na rede + faça backup centralizado diariamente  |

---

### 8. Recomendações finais

- **Mantenha a pasta fixa** e com nome claro (ex: C:\EstoqueEnterprise)
- **Faça backup semanal** (ou diário em ambientes críticos)
- **Não limpe o cache** do navegador sem backup prévio
- **Atualize o navegador** periodicamente
- **Use o perfil administrador** apenas para configurações; operadores devem ter contas restritas
- **Documente** as senhas iniciais e alterações importantes

**Pronto!**  
O sistema está instalado e pronto para uso em menos de 5 minutos.

Boa gestão do estoque!

Suporte técnico: Contate o administrador do sistema ou o responsável pela manutenção.