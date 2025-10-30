# Decisões Técnicas — God Level Coder Challenge

## Arquitetura Geral

**Decisão:** Adotar arquitetura **modular em camadas (Frontend, Backend, Infraestrutura)**.  
**Motivo:** Facilita manutenção, testes independentes e escalabilidade futura.

**Decisão:** Utilização de apenas um repositório para todo o projeto ( monorepo )  
**Motivo:** visar a simplicidade, não havendo necessidade de complexidade adicional com múltiplos repositórios

---

## Linguagem Backend — Python (FastAPI)

**Decisão:** Usar **Python** com **FastAPI**.  
**Motivo:** Visando que python é uma ótima linguagem para manipulação de dados, possui excelente performance, suporte nativo a async, e ecossistema de dados (Pandas, NumPy, SQLAlchemy).  
**Alternativa:** Java + Spring Boot ( possuo mais experiência com a tecnologia ).  
**Por que não?** Maior tempo de setup e menor flexibilidade para prototipagem de analytics.

---

## Banco de Dados — PostgreSQL

**Decisão:** PostgreSQL.  
**Motivo:** Foi o banco recomendado no desafio ( também possuo mais experiência ).

---

## Cache — Redis

**Decisão:** Manter cache de resultados de queries agregadas no **Redis**.  
**Motivo:** Reduz tempo de resposta e evita sobrecarga no banco.

---

## ORM — SQLAlchemy

**Decisão:** Usar **SQLAlchemy ORM** para gerar queries.  
**Motivo:** Evita SQL manual, melhora manutenção e permite reaproveitar lógicas de filtro no backend.

---

## Processamento — Pandas

**Decisão:** Utilizar **Pandas** para manipulação de dados.
**Motivo:** Permite análises complexas, agrupamentos e comparações temporais.

---

## Frontend — Next.js + Tailwind

**Decisão:** Usar **Next.js** (React Framework) com **TailwindCSS**.  
**Motivo:** Build rápido, SSR opcional, estilização moderna e suporte fácil a componentes reutilizáveis.

---

## Query Builder Visual (Frontend)

**Decisão:** Implementar uma interface drag-and-drop para criação de filtros e colunas.  
**Motivo:** Permite flexibilidade e simplicidade para usuários não técnicos.

## Visualização — Recharts ( A confirmar )

**Decisão:** Usar **Recharts** para renderização de gráficos.  
**Motivo:** Simples, personalizável e bem documentada.  
**Alternativa:** Chart.js, ECharts.  
**Por que não?** Chart.js menos flexível para dashboards interativos.

---

## Deploy — Docker Compose ( inicialmente )

**Decisão:** Usar **Docker Compose** durante o desenvolvimento.  
**Motivo:** Facilita setup e reprodutibilidade (“clone e rode”).  
**Plano futuro:** Deploy em cloud (Render, Fly.io ou Railway).

---

## Deploy Final — Ver melhores opções de plataformas de deploy

---

## Diferenciais Planejados ( Futuro, Se der tempo )

- Query Builder visual para criação livre de dashboards
- Insights automáticos (detecção de variação de métricas)
- Exportação de relatórios (PDF/CSV)
