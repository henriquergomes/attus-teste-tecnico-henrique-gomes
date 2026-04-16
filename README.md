# Teste Técnico Attus - Frontend (Henrique Gomes)

[![CI/CD Pipeline](https://github.com/henriquergomes/attus-teste-tecnico-henrique-gomes/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/henriquergomes/attus-teste-tecnico-henrique-gomes/actions/workflows/ci-cd.yml)

Este projeto foi desenvolvido como parte do processo seletivo da Attus. A aplicação foi refinada para entregar uma experiência de usuário (UX) de alto nível, utilizando o que há de mais moderno no ecossistema **Angular 21**.

## 🌐 Demo Online

A aplicação está hospedada e disponível publicamente via **GitHub Pages**:

👉 **[henriquergomes.github.io/attus-teste-tecnico-henrique-gomes](https://henriquergomes.github.io/attus-teste-tecnico-henrique-gomes)**

## 🎨 Identidade Visual (Branding Attus.ai)

A aplicação foi totalmente reformulada para seguir a identidade visual oficial da **Attus.ai**:

- **Design System**: Baseado em tons profundos de violeta, verde menta e preto tecnológico.
- **Glassmorphism**: Interface baseada em transparências, desfoque de fundo (`backdrop-filter`) e bordas com gradiente.
- **Tipografia**: Uso da fonte **Outfit** (Extra Bold) para títulos de alto impacto e hierarquia clara de informações.
- **Motion Design**: Animações de entrada (`fadeInUp`) em todos os componentes para uma navegação fluida.

## 🚀 Tecnologias e Arquitetura

- **Angular 21 (Zoneless)**: Implementado `provideZonelessChangeDetection()` para performance superior sem `zone.js`.
- **Angular Material 3**: Componentes de última geração com customização profunda via CSS Variables.
- **Signals**: Gerenciamento de estado granular e reativo em toda a aplicação.
- **NgRx**: Implementação de Store reativa para gerenciamento de estado complexo (Exercício To-do).
- **RxJS**: Operadores avançados para fluxos de busca assíncronos e tratamentos de debounce.

## 🛠 Funcionalidades de Destaque

- **Listagem Híbrida**: Alternância entre **Grid (Cards)** e **Lista (Expansion Panels)**.
- **Layout Independente**: No modo lista, os painéis são organizados em duas colunas que se comportam de forma independente, garantindo que a expansão de um item não quebre o alinhamento da coluna vizinha.
- **Máscaras Inteligentes (CPF/Telefone)**: Diretivas customizadas que formatam dados em tempo real, inclusive para valores carregados via `patchValue`.
- **Custom Email Input**: Componente reutilizável (CVA) com autocomplete inteligente para domínios de e-mail populares.
- **CRUD Completo**: Adição, Edição e Exclusão (com diálogo de confirmação do Material).

## 📝 Respostas Teóricas

As respostas aos exercícios práticos e teóricos do teste (incluindo refatoração de código, TypeScript avançado e RxJS) podem ser encontradas no arquivo:
👉 [**RESPOSTAS.md**](RESPOSTAS.md)

## ⚙️ CI/CD com GitHub Actions

O projeto possui uma pipeline de **Integração e Entrega Contínua (CI/CD)** configurada via **GitHub Actions** (`.github/workflows/ci-cd.yml`), disparada automaticamente a cada `push` ou `Pull Request` na branch `main`.

### Fluxo da Pipeline

```
Push / Pull Request
       │
       ▼
┌─────────────────────────────┐
│   JOB: build-and-test       │
│  ─────────────────────────  │
│  1. Checkout do código      │
│  2. Configurar Node.js 22   │
│  3. npm ci (instalar deps)  │
│  4. npm run coverage        │  ← Testes (Vitest) + relatório de cobertura
│  5. ng build (produção)     │  ← Build com --base-href para GitHub Pages
│  6. Upload do artefato      │
└────────────┬────────────────┘
             │ (apenas em push, não em PR)
             ▼
┌─────────────────────────────┐
│   JOB: deploy               │
│  ─────────────────────────  │
│  1. Download do artefato    │
│  2. Deploy → GitHub Pages   │  ← Publica automaticamente na branch gh-pages
└─────────────────────────────┘
```

### Actions Utilizadas

| Action | Versão | Finalidade |
|---|---|---|
| `actions/checkout` | v5 | Faz o checkout do repositório |
| `actions/setup-node` | v5 | Configura o Node.js 22 com cache do npm |
| `actions/upload-artifact` | v5 | Salva os arquivos de build entre jobs |
| `actions/download-artifact` | v5 | Recupera os arquivos de build no job de deploy |
| `peaceiris/actions-gh-pages` | v4 | Publica o build na branch `gh-pages` |

## 🏁 Como Executar

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Executar o projeto**:

   ```bash
   npm start
   ```

   A aplicação estará disponível em `http://localhost:4200`.

3. **Executar testes unitários e Cobertura (Coverage)**:

   Para assegurar a qualidade do código, a aplicação possui uma suite de testes unitários rodando no ecossistema do **Vitest**. A cobertura média excede a exigência comum de **70%**.

   ```bash
   # Rodar os testes em modo "watch" (desenvolvimento)
   npm run test

   # Rodar os testes e gerar o relatório de cobertura completo
   npm run coverage
   ```

   *(Após gerar a cobertura, um relatório HTML visual interativo é gerado na pasta `/coverage`)*.

4. **Formatação Automática**:

   ```bash
   npm run format
   ```

---

Desenvolvido por **Henrique Gomes**. ✨
