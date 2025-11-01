# ✅ Checklist de Desenvolvimento — Case Técnico (7 Dias)

Projeto iniciado no dia 28/10/2025 ( Terça-feira )
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

## ⚙️ Dia 2 — Estruturação e Integração do Backend

**Objetivo:** Iniciar o backend do zero, estruturando diretórios, configurando o ambiente e conectando ao PostgreSQL e Redis.

### Tarefas

#### 🧱 Estrutura inicial do backend

- [ X ] Criar setup inicial do diretório: `backend/` com subpastas:
- [ X ] Criar arquivo `main.py` (ponto de entrada da aplicação)
- [ X ] Adicionar `requirements.txt`(dependências iniciais):
  - `fastapi`, `uvicorn`, `sqlalchemy`, `psycopg2-binary`, `redis`, `pandas`, `python-dotenv`, `pytest`

#### ⚙️ Configuração de ambiente

- [ X ] Criar arquivo `.env` com variáveis necessárias
- [ X ] Criar `docker-compose.yml` com containers:
- `backend` (FastAPI)
- `redis` (Redis)

#### 🧩 Integração com o banco

- [ X ] Criar `db_session.py` (configuração da engine e sessão do SQLAlchemy)
- [ X ] Testar conexão com o banco e listar tabelas disponíveis
- [ X ] Criar rota inicial `/health` (retorna status de banco e Redis)

#### 🔥 Integração com Redis

- [ X ] Criar `cache_service.py` (funções de get/set simples)
- [ X ] Testar leitura e escrita no Redis
- [ X ] Adicionar validação de conexão dentro da rota `/health`

### Entregáveis

- [ ] Estrutura completa do backend criada e organizada
- [ X ] Conexões com PostgreSQL e Redis testadas e funcionais
- [ X ] API inicial executando (`/health` OK via Docker Compose)

---

## 📊 Dia 3 — Core do Backend: SQLAlchemy + Pandas + Redis

**Objetivo:** Implementar a lógica de consultas e processamento de dados.

### Tarefas

- [ ] Criar módulo `query_builder_service.py` para processar JSONs do front
- [ ] Implementar integração com **SQLAlchemy** para gerar queries dinâmicas
- [ ] Implementar **Redis Cache**:
  - [ ] Gerar chave de cache (hash da query)
  - [ ] Verificar cache antes da execução
  - [ ] Salvar resultado processado após execução
- [ ] Processar dados com **Pandas** (agregações, filtros, métricas)
- [ ] Criar endpoints `/query` e `/analytics` com FastAPI
- [ ] Documentar fluxo de cache e dados no **ARCHITECTURE.md**

### Entregáveis

- [ ] API funcional conectada ao banco e ao cache
- [ ] Lógica de query → SQL → Pandas → Redis implementada
- [ ] Respostas JSON otimizadas e testadas

---

## 💻 Dia 4 — Frontend Base + Conexão com a API

**Objetivo:** Exibir dados reais vindos do backend.

### Tarefas

- [ ] Criar app **Next.js** com **TailwindCSS + ShadCN**
- [ ] Configurar **Axios** e **React Query**
- [ ] Criar rotas:
  - [ ] `/dashboard` (overview)
  - [ ] `/analytics` (exploração de dados)
- [ ] Criar componentes:
  - [ ] Cards de métricas
  - [ ] Gráficos com **Recharts**
  - [ ] Filtros interativos (período, canal, loja)
- [ ] Testar integração frontend ↔ backend (via Docker Compose)

### Entregáveis

- [ ] Interface base funcional e conectada à API
- [ ] Dados reais exibidos nos gráficos e cards

---

## 📈 Dia 5 — Query Builder Visual (dnd-kit)

**Objetivo:** Implementar a montagem de consultas personalizadas no front.

### Tarefas

- [ ] Adicionar **dnd-kit** e configurar área de drag-and-drop
- [ ] Criar componentes de blocos:
  - [ ] Dimensão (ex: produto, canal)
  - [ ] Métrica (ex: total vendas, ticket médio)
  - [ ] Filtro (campo, operador, valor)
- [ ] Gerar JSON de consulta com base no estado visual
- [ ] Enviar JSON ao backend via React Query
- [ ] Exibir resultados dinâmicos (gráficos e tabelas)
- [ ] Documentar funcionamento no **DECISIONS.md**

### Entregáveis

- [ ] Query Builder visual funcional (drag-and-drop)
- [ ] JSON enviado corretamente para o backend
- [ ] Resultados em tempo real (resposta do Redis/Pandas)

---

## 🧩 Dia 6 — Polimento, UX e Exportações

**Objetivo:** Entregar refinamento e usabilidade profissional.

### Tarefas

- [ ] Implementar exportação (CSV/PDF)
- [ ] Melhorar responsividade e layout
- [ ] Adicionar animações leves com **Framer Motion**
- [ ] Revisar textos, tooltips e feedbacks visuais
- [ ] Atualizar documentação UX (`UX_NOTES.md`)

### Entregáveis

- [ ] Interface refinada e intuitiva
- [ ] Experiência de uso fluida para a persona “Maria”
- [ ] Documentação de design finalizada

---

## 🎥 Dia 7 — Entrega e Apresentação Final

**Objetivo:** Consolidar documentação e preparar o vídeo de entrega.

### Tarefas

- [ ] Revisar todos os arquivos de documentação:
  - [ ] **README final**
  - [ ] **ARCHITECTURE.md**
  - [ ] **DECISIONS.md**
  - [ ] **UX_NOTES.md**
- [ ] Testar execução do projeto (`docker compose up`)
- [ ] Gravar vídeo (5–10 min):
  - [ ] Contexto da dor da “Maria”
  - [ ] Demonstração do dashboard
  - [ ] Diferenciais técnicos
- [ ] Revisar deploy local e limpeza de logs

### Entregáveis

- [ ] Aplicação completa e funcional
- [ ] Documentação técnica e UX finalizada
- [ ] Vídeo de apresentação gravado e entregue

---
