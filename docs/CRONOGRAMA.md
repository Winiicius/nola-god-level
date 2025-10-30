# ✅ Checklist de Desenvolvimento — Case Técnico (7 Dias)

Projeto iniciado no dia 28/10/2025 ( Segunda-feira )
Data do prazo: 03/11/2025 ( Próxima Segunda )
Ao total são 7 dias para desenvolvimento do desafio.

---

## 🧩 Dia 1 — Planejamento e Setup

**Objetivo:** Base sólida, repositório estruturado e documentação inicial.

### Tarefas

- [ X ] Criar repositório GitHub (`nola-god-level`)
- [ X ] Criar pastas principais:
  - [ X ] `backend/`
  - [ X ] `frontend/`
  - [ X ] `docs/`
- [ X ] Escrever **README inicial** (objetivo, setup, stack)
- [ X ] Criar arquivos de documentações principais: **ARCHITECTURE.md**, **CRONOGRAMA.md**, **DECISIONS.md**, **README.md**.
- [ X ] Gerar dados de análise ( executar `generate_data.py` )

### Entregáveis

- [ X ] Estrutura inicial clara e documentada
- [ X ] Dados de vendas gerados corretamente

### Observações

```
Arquivos de documentação serão finalizados no dia 2
```

---

## ⚙️ Dia 2 — Modelagem de Dados e API Base

**Objetivo:** Preparar o backend para consultas reais.

### Tarefas

- [ ] Analisar dados fornecidos (ex: `generate_data.py`)
- [ ] Integrar Swagger para documentação automática

### Entregáveis

- [ ] Backend conectado ao PostgreSQL
- [ ] API funcional retornando dados mockados
- [ ] Diagrama ER adicionado à pasta `docs/`

### Observações

```

```

---

## 📊 Dia 3 — Camada de Análises (Core do Backend)

**Objetivo:** Implementar lógica de agregações e insights.

### Tarefas

- [ ] Criar módulo `analytics_service.py`
- [ ] Implementar funções:
  - [ ] `get_total_revenue(periodo, canal, loja)`
  - [ ] `get_top_products(periodo, canal)`
  - [ ] `get_ticket_medio(periodo)`
  - [ ] `get_customer_retention(periodo)`
- [ ] Otimizar queries com SQL + Pandas
- [ ] Adicionar cache Redis para requisições repetidas
- [ ] Criar testes básicos com **pytest**

### Entregáveis

- [ ] Backend retornando dados reais e rápidos
- [ ] Módulo de analytics validado
- [ ] Documentação técnica das queries

### Observações

```

```

---

## 💻 Dia 4 — Frontend Base + Conexão com API

**Objetivo:** Exibir dados reais vindos do backend.

### Tarefas

- [ ] Criar app **Next.js** com **Tailwind**
- [ ] Configurar Axios para chamadas à API
- [ ] Criar páginas:
  - [ ] `/dashboard` (overview geral)
  - [ ] `/products` (produtos mais vendidos)
- [ ] Criar componentes:
  - [ ] Card de métricas
  - [ ] Gráfico (Recharts)
  - [ ] Filtros de período e canal
- [ ] Integrar frontend ↔ backend (testes locais via Docker)

### Entregáveis

- [ ] Interface base funcional e conectada à API
- [ ] Layout responsivo e estilizado

### Observações

```

```

---

## 📈 Dia 5 — Customização e Exploração Livre

**Objetivo:** Criar o diferencial da solução — dashboards dinâmicos e insights.

### Tarefas

- [ ] Implementar **Query Builder visual**:
  - [ ] Selecionar dimensão (ex: produto, canal, loja)
  - [ ] Selecionar métrica (ex: total de vendas, ticket médio)
  - [ ] Selecionar período
- [ ] Permitir gerar gráficos baseados nessas seleções
- [ ] Salvar configurações no `localStorage` (mock)
- [ ] Implementar **insights automáticos**:
  - [ ] “Seu faturamento caiu X% vs semana passada.”

### Entregáveis

- [ ] Painel interativo e dinâmico
- [ ] Primeira versão do recurso de insights automáticos

### Observações

```

```

---

## 🧩 Dia 6 — Refinamento + Exportações + UX

**Objetivo:** Entregar polimento e profissionalismo.

### Tarefas

- [ ] Implementar exportação de relatórios (PDF/CSV)
- [ ] Melhorar responsividade e layout geral
- [ ] Adicionar animações leves (Framer Motion)
- [ ] Revisar nomes, tooltips e UX pensando na persona “Maria”
- [ ] Atualizar **UX_NOTES.md** explicando decisões de design

### Entregáveis

- [ ] Dashboard refinado e agradável
- [ ] Experiência de uso intuitiva
- [ ] Documentação UX atualizada

### Observações

```

```

---

## 🎥 Dia 7 — Entrega, Documentação e Vídeo

**Objetivo:** Preparar entrega final e apresentação.

### Tarefas

- [ ] Atualizar **README final** com:
  - [ ] Setup simples (`docker compose up`)
  - [ ] Prints do dashboard
  - [ ] Fluxo de uso
  - [ ] Decisões técnicas principais
- [ ] Gravar vídeo (5–10 min):
  - [ ] Explicar a dor da “Maria”
  - [ ] Mostrar uso da aplicação
  - [ ] Destacar features e diferenciais
- [ ] Testar execução em máquina limpa

### Entregáveis

- [ ] Documentação final completa (README, DECISIONS, ARCHITECTURE, UX)
- [ ] Aplicação funcional via Docker
- [ ] Vídeo de apresentação finalizado

### Observações

```

```

---
