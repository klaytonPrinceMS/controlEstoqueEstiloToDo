# 25. 📊 Métricas de Software  
**Sistema de Estoque Enterprise**

**Objetivo do documento:**  
Definir, acompanhar e reportar as principais métricas de qualidade, desempenho, manutenibilidade e saúde geral do código e da aplicação.  
As métricas são divididas em categorias e incluem metas realistas para uma aplicação 100% offline em JavaScript Vanilla.

**Data de criação:** Janeiro 2026  
**Revisão:** 1.1  
**Responsável:** Equipe de Desenvolvimento / Administrador do Sistema  
**Periodicidade de revisão:** A cada release ou trimestralmente

---

## 25.1 Métricas de Código e Manutenibilidade

| #   | Métrica                              | Meta / Valor Esperado                  | Valor Atual | Status     | Observação / Ferramenta sugerida                  |
|-----|--------------------------------------|----------------------------------------|-------------|------------|---------------------------------------------------|
| M01 | Linhas de Código (LOC) total         | < 3.500 (ideal < 2.500)                | [A medir]   | —          | Contar apenas .js + .html + .css                 |
| M02 | Complexidade Ciclomática média       | ≤ 8 por função (máx. 15 em funções críticas) | [A medir]   | —          | SonarQube, eslint-plugin-complexity ou manual     |
| M03 | Cobertura de testes automatizados    | ≥ 75% (meta futura: ≥ 85%)             | [A medir]   | —          | Jest + Istanbul (quando implementado)             |
| M04 | Duplicação de código                 | ≤ 5%                                   | [A medir]   | —          | SonarQube, Copy/Paste Detector                    |
| M05 | Dívida Técnica estimada              | ≤ 2 dias de trabalho                   | [A medir]   | —          | SonarQube, manual (tempo estimado de refatoração) |
| M06 | Número de funções/métodos            | ≤ 150 funções totais                   | [A medir]   | —          | Contagem automática ou manual                     |
| M07 | Tamanho médio de função              | ≤ 40 linhas                            | [A medir]   | —          | Contagem sem comentários e linhas em branco       |

---

## 25.2 Métricas de Qualidade e Estabilidade

| #   | Métrica                              | Meta                                   | Valor Atual | Status     | Observação / Método de medição                    |
|-----|--------------------------------------|----------------------------------------|-------------|------------|---------------------------------------------------|
| Q01 | Bugs abertos por KLOC                | ≤ 3 bugs / 1.000 linhas                | [A medir]   | —          | Contagem manual ou ferramenta de issue tracking   |
| Q02 | Taxa de resolução de bugs            | ≥ 95% nos últimos 30 dias              | [A medir]   | —          | (bugs resolvidos / bugs reportados) × 100         |
| Q03 | Tempo médio de correção de bugs      | ≤ 3 dias úteis                         | [A medir]   | —          | Média do tempo entre abertura e fechamento        |
| Q04 | Número de crashes / erros críticos   | 0 por release                          | [A medir]   | —          | Monitoramento manual de relatos de usuários       |
| Q05 | Satisfação do usuário (NPS estimado) | ≥ 8/10 (baseado em feedback interno)   | [A medir]   | —          | Pesquisa simples pós-implantação                  |

---

## 25.3 Métricas de Performance e Experiência do Usuário

| #   | Métrica                              | Meta                                   | Valor Atual | Status     | Método de medição / Ferramenta                    |
|-----|--------------------------------------|----------------------------------------|-------------|------------|---------------------------------------------------|
| P01 | Tempo de carregamento inicial        | ≤ 1,5 segundos                         | [A medir]   | —          | Chrome DevTools → Performance (cold start)        |
| P02 | Tempo de resposta a ações locais     | ≤ 80 ms                                | [A medir]   | —          | Chrome DevTools → Performance                     |
| P03 | Tempo de renderização de setores     | ≤ 300 ms (com 50 setores)              | [A medir]   | —          | Medição manual com console.time()                 |
| P04 | Uso de memória (RAM do navegador)    | ≤ 80 MB (com 1000 itens)               | [A medir]   | —          | Chrome Task Manager                               |
| P05 | Capacidade máxima suportada          | ≥ 1200 itens + 200 logs sem degradação perceptível | [A medir]   | —          | Teste de carga com itens fictícios                |
| P06 | Tempo de busca (1000 itens)          | ≤ 150 ms                               | [A medir]   | —          | console.time() na função de filtro                |

---

## 25.4 Métricas Operacionais e de Uso

| #   | Métrica                              | Meta / Alvo                            | Valor Atual | Status     | Observação / Método                               |
|-----|--------------------------------------|----------------------------------------|-------------|------------|---------------------------------------------------|
| O01 | Número de usuários cadastrados       | ≤ 100 (limite prático)                 | [A medir]   | —          | Contagem em db.usuarios.length                    |
| O02 | Número médio de logins diários       | — (referência futura)                  | [A medir]   | —          | Contagem via logs                                 |
| O03 | Quantidade total de itens no estoque | ≤ 1500 (limite de segurança)           | [A medir]   | —          | db.itens.length                                   |
| O04 | Taxa de solicitações atendidas       | ≥ 90%                                  | [A medir]   | —          | (solicitações atendidas / total) × 100            |
| O05 | Tamanho do LocalStorage utilizado    | ≤ 7 MB                                 | [A medir]   | —          | localStorage.length + estimativa de bytes         |

---

## 25.5 Status Geral Atual e Próximos Passos

**Resumo do status atual (preenchimento inicial):**  
- [ ] Código base concluído  
- [ ] Métricas iniciais coletadas  
- [ ] Primeira medição de performance realizada  
- [ ] Testes de carga simulados com 1000 itens

**Próximos passos recomendados:**
1. Implementar script simples de coleta automática de métricas básicas (LOC, complexidade, tamanho do db)
2. Realizar baseline de performance com dados reais (após primeiro mês de uso)
3. Definir ferramenta de monitoramento contínuo (ex.: console.log + planilha simples ou SonarQube local)
4. Revisar métricas após cada grande release

**Responsável pela atualização deste documento:** Administrador / Desenvolvedor principal  
**Próxima revisão sugerida:** Após o primeiro mês de uso em produção

Este documento deve ser vivo e atualizado periodicamente com valores reais medidos.