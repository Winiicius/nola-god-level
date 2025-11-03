# Desafio Nola God Level

# Seções

- [Entenda o escopo do desafio](#entenda-o-escopo-do-desafio)
- [Como funciona minha solução](#minha-solução--godlevel-analytics)
- [Vídeo apresentando solução](#video-apresentação)
- [Acesse a aplicação aqui](#deploy)
- [Como rodar localmente via docker](#tutorial--subindo-os-serviços-com-docker-compose)
- [Desenvolvedor](#desenvolvedor)

# Observação

Os seguintes arquivos contém descrição da minha solução e resumo do porque tomei cada descisão na hora de escolher cada tecnologia:

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- [DECISIONS.md](./docs/DECISIONS.md)

# Entenda o Escopo do Desafio

O desafio consiste em desenvolver uma **plataforma de análise de dados (Business Intelligence)** voltada para o setor de **alimentação e restaurantes**, permitindo que usuários explorem, visualizem e compreendam informações operacionais e comerciais de forma intuitiva.

A proposta central é construir um **ambiente analítico completo**, onde dados brutos (como vendas, produtos, clientes e operações) são transformados em **insights estratégicos** por meio de consultas dinâmicas, métricas e relatórios visuais.

---

## 🎯 Objetivo principal

Criar uma aplicação capaz de:

- Consultar diferentes conjuntos de dados (tabelas de domínio como _vendas_, _clientes_, _produtos_, _operações_);
- Permitir ao usuário **selecionar métricas, dimensões e filtros** para construir análises personalizadas;
- Gerar visualizações (gráficos e tabelas) que facilitem a interpretação de indicadores de desempenho;
- Tornar a exploração de dados acessível a usuários não técnicos, como gestores e analistas.

---

## 🧱 Componentes esperados

O desafio envolve o desenvolvimento de três camadas principais:

1. **Camada de Dados (Modelagem Semântica)**

   - Estruturar um banco de dados relacional contendo as principais entidades de negócio.
   - Definir uma **camada semântica** que mapeia campos técnicos (SQL) para conceitos de negócio (ex: “Faturamento Total”, “Canal de Venda”, “Loja”).

2. **Camada de Backend (API Analítica)**

   - Construir uma API responsável por interpretar consultas do usuário, gerar queries SQL dinamicamente e retornar os resultados já agregados.
   - Implementar um endpoint que descreve o **modelo semântico** (`/schema`) e outro para executar consultas (`/query`).

3. **Camada de Frontend (Interface Interativa)**

   - Desenvolver uma interface que permita a construção visual de consultas através de drag-and-drop.
   - Exibir resultados em tempo real por meio de gráficos e dashboards interativos.

---

## 💡 Problema a ser resolvido

Empresas do ramo alimentício possuem grandes volumes de dados distribuídos em diferentes sistemas (PDV, delivery, CRM, etc.).
O desafio propõe centralizar e traduzir esses dados em **informações compreensíveis e acionáveis**,
fornecendo aos gestores uma visão completa sobre desempenho, faturamento, clientes e operações.

---

## 🧩 Em resumo

O desafio **não é apenas técnico**, mas também **analítico**: exige entender o domínio de negócio.

A solução deve unir **modelagem de dados, APIs inteligentes e uma interface interativa** — formando uma experiência completa de exploração analítica.

# Minha Solução — GodLevel Analytics

A solução desenvolvida, chamada **GodLevel Analytics**, foi projetada para atender ao escopo do desafio de forma modular, moderna e escalável.
Ela combina uma arquitetura **full stack** com **processamento analítico dinâmico**, oferecendo uma experiência fluida de exploração de dados para o usuário final.

![Diagrama de Arquiterura](./imagens/Diagrama%20de%20Arquitetura_fluxo%20de%20dados.drawio.png)

veja mais detalhes na documentação da arquiterura -> [ARCHITECTURE.md](./docs/ARCHITECTURE.md)  
veja as tecnologias usadas e o motivo de escolha de cada uma -> [DECISIONS.md](./docs/DECISIONS.md)

## ✅ Resultado Final

A aplicação GodLevel Analytics entrega uma experiência completa de **exploração analítica**, permitindo que qualquer usuário monte suas próprias análises com facilidade — sem precisar conhecer SQL.

O resultado é uma solução moderna, modular e extensível, que une **dados, inteligência e experiência de uso** em um só ecossistema.

# Video apresentação

# deploy

# Tutorial — Subindo os serviços com Docker Compose

> O passo de **geração de dados é obrigatório** — sem ele, o banco ficará vazio e o sistema não funcionará corretamente.

---

## 🧱 Requisitos

Antes de começar, certifique-se de ter instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/downloads)

---

## 🚀 Setup Completo (ambiente local)

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/lucasvieira94/nola-god-level.git
cd nola-god-level
```

### Criar arquivo .env

Dentro da pasta `backend/` crie

---

### 2️⃣ Limpe containers e volumes antigos

```bash
docker compose down -v 2>/dev/null || true
```

Isso garante que você não tenha dados antigos de execuções anteriores.

---

### 3️⃣ Construa o container do gerador de dados

```bash
docker compose build --no-cache data-generator
```

Esse serviço é responsável por popular o banco com dados iniciais obrigatórios (simulados de vendas, clientes, produtos etc.).

---

### 4️⃣ Suba o serviço do banco de dados

```bash
docker compose up -d postgres
```

Esse comando inicia o container **PostgreSQL**, cria o banco `challenge_db` e aplica o schema definido no arquivo:

```
./database-schema.sql
```

### 5️⃣ Gere os dados obrigatórios

Execute o gerador de dados:

```bash
docker compose run --rm data-generator
```

Esse comando pode durar entre 5-15 minutos para ser executado

---

### 6️⃣ Suba os demais serviços (frontend, backend e ferramentas)

```bash
docker compose --profile tools up -d pgadmin backend frontend redis
```

Esse comando:

- Inicia o **PgAdmin** (interface de gerenciamento do banco)
- Sobe o **backend (FastAPI)** em `http://localhost:8000`
- Sobe o **frontend (Next.js)** em `http://localhost:3000`
- Sobe o **Redis** (cache local)

---

## 🧩 Acessos rápidos

| Serviço                    | URL                                                             | Descrição                           |
| -------------------------- | --------------------------------------------------------------- | ----------------------------------- |
| **Frontend (Next.js)**     | [http://localhost:3000](http://localhost:3000)                  | Interface principal do usuário      |
| **Backend (FastAPI Docs)** | [http://localhost:8000/docs](http://localhost:8000/docs)        | API interativa e endpoints          |
| **PgAdmin**                | [http://localhost:5050](http://localhost:5050)                  | Interface gráfica para o PostgreSQL |
| **Banco (psql CLI)**       | `docker exec -it godlevel-db psql -U challenge -d challenge_db` | Console SQL                         |
| **Redis CLI**              | `docker exec -it redis redis-cli`                               | Inspecionar o cache                 |

---

## 🧹 Parar e limpar o ambiente

### Parar todos os containers:

```bash
docker compose down
```

### Parar e **limpar completamente** o ambiente (banco e cache):

```bash
docker compose down -v
```

---

## ✅ Resultado final esperado

Poderá acessar:

- 🌐 **Frontend:** [http://localhost:3000](http://localhost:3000)
- ⚙️ **API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- 🗄️ **PgAdmin:** [http://localhost:5050](http://localhost:5050)

### Desenvolvedor

<strong>Winicius</strong>

<p>
<a href="https://github.com/Winiicius" rel="noopener">
    <img width="100" height="100" style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102719335?v=4" alt="Foto Winicius">
</a>
</p>
<p>
<a href="https://www.linkedin.com/in/winicius-alexandre" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>
</p>
