# 📝 Lições Aprendidas  
**Sistema de Estoque Enterprise**  

**Data de início do documento:** Janeiro 2026  
**Data da última atualização:** Janeiro 2026  
**Responsável pela manutenção:** Equipe de Desenvolvimento

Este documento registra as principais lições aprendidas durante o ciclo de vida do projeto, com foco em desenvolvimento, arquitetura, usabilidade, performance e manutenção de uma aplicação 100% offline em JavaScript vanilla.

---

## 1. O que funcionou muito bem

- Arquitetura de **estado único** centralizado no objeto `db` → facilitou debugging, persistência e sincronização da interface
- Uso intensivo de **Custom Events** para comunicação entre módulos → desacoplamento excelente e renderização reativa natural
- Implementação do **debounce** no salvamento do localStorage → evitou gargalos de performance em operações em sequência
- Sistema de **logs estruturado e padronizado** desde o início → tornou a auditoria e o debug muito mais eficientes
- **Drag-and-drop nativo** (HTML5 Drag & Drop API) → experiência de usuário muito boa com custo baixo de implementação
- **Notificações toast simples e empilháveis** → feedback ao usuário rápido e não intrusivo
- Validação de **permissões centralizada** (`requirePermission`) → evitou erros de autorização espalhados pelo código

---

## 2. O que poderia ter sido melhor / pontos de atenção

- Hash de senha extremamente fraco (`btoa + reverse`) → aceitável apenas por ser 100% offline e interno, mas limita fortemente qualquer futura evolução para ambiente com risco maior
- **Limitação de tamanho do LocalStorage** (~5–10 MB) chegou perto do limite com muitos itens e logs longos
- Ausência de **indexação/busca eficiente** nos itens → buscas com muitos itens (500+) começam a ficar perceptivelmente lentas
- **Drag-and-drop em mobile** → suporte parcial (touch events precisam de polyfill ou tratamento específico)
- Falta de **exportação/importação automática** de backup → usuário precisa fazer manualmente (o que gera risco de perda de dados)
- **Sem mecanismo de versionamento do schema do db** → atualizações futuras do modelo de dados podem quebrar compatibilidade retroativa
- Documentação inline no código poderia ter sido iniciada mais cedo

---

## 3. Problemas encontrados (e quando ocorreram)

| # | Problema | Quando ocorreu | Impacto | Gravidade |
|---|----------|----------------|---------|-----------|
| 1 | LocalStorage quota exceeded em navegadores antigos | ~800 itens + 200 logs longos | Bloqueio total de salvamento | Alta |
| 2 | IP via WebRTC retornando undefined em alguns navegadores modernos | Firefox strict mode / modo privado | Logs sem IP | Média |
| 3 | Device ID mudando ao abrir em aba anônima ou após limpeza de dados | Sempre em modo privado | Auditoria perde rastreabilidade | Média |
| 4 | Drag & drop não funciona bem em touch devices sem tratamento adicional | Mobile / tablets | Experiência ruim para operadores | Alta |
| 5 | Busca linear lenta com > 600 itens | Após carga real de dados | Delay perceptível na busca | Média |
| 6 | Usuário admin acidentalmente excluído em reset parcial | Testes de reset | Necessidade de recriação manual | Baixa |
| 7 | Confusão entre setor "estoque" e "solicitacao" em algumas validações | Início do desenvolvimento | Bugs de transferência | Média |

---

## 4. Soluções aplicadas (ou planejadas)

- **Quota exceeded**: Implementado limite artificial de itens (~900) + alerta preventivo + exclusão automática de itens zerados antigos (opcional)
- **IP via WebRTC**: Adicionado fallback para "unknown" + documentação clara que IP é apenas rede local
- **Device ID em modo privado**: Aceitação do risco + registro explícito no log que é sessão anônima
- **Drag & drop mobile**: Planejado polyfill de touch events (pointer events) na v1.1
- **Busca lenta**: Implementação de índice em memória simples (Map<string, Item[]>) para buscas por nome
- **Reset perigoso**: Adicionadas confirmações múltiplas + opção explícita "Manter apenas admin"
- **Schema do db**: Planejado adicionar campo `schemaVersion` no db para futuras migrações

---

## 5. Recomendações para próximos projetos (ou evolução deste)

1. **Começar cedo com backup/exportação** (JSON download + import) — essencial em aplicações offline
2. **Planejar desde o início o versionamento do schema** dos dados (ex: `db.schemaVersion`)
3. **Usar hash mais robusto** mesmo em aplicações offline (argon2 via wasm, por exemplo) — prepara para o futuro
4. **Implementar índice para buscas** desde o início quando se espera volume médio/alto de dados
5. **Testar mobile cedo** — drag-and-drop, touch, scroll, tamanho de tela
6. **Documentação inline + README** deve acompanhar o desenvolvimento, não ser feita no final
7. **Considerar compressão** dos dados no LocalStorage (LZ-string ou similar) se o volume crescer
8. **Criar script de testes automatizados** (mesmo simples via browser console) para fluxos críticos
9. **Definir política clara de limpeza de logs** (ex: manter apenas últimos 90 dias + 200 entradas)

---

**Observação final:**

Este documento deve ser **atualizado continuamente** durante o ciclo de vida do projeto — idealmente a cada sprint ou após grandes entregas.

**Última atualização:** Janeiro 2026  
**Próxima revisão sugerida:** Após primeira implantação real com usuários (março/abril 2026)
