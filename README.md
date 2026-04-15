# Teste Técnico Attus - Frontend

Este projeto foi desenvolvido como parte do processo seletivo da Attus. A aplicação demonstra conhecimentos em Angular 21, Angular Material 21, RxJS, NgRx e Angular Signals.

## 🛠 Tecnologias Utilizadas

- **Angular 21**: Versão mais recente do framework, utilizando componentes Standalone e Controle de Fluxo nativo (`@if`, `@for`).
- **Angular Material 21**: Componentes de UI modernos e acessíveis.
- **NgRx 21**: Gerenciamento de estado global (implementado na feature de To-do).
- **Angular Signals**: Gerenciamento de estado reativo e granular (implementado na listagem de usuários e no contador).
- **RxJS**: Operadores avançados para busca reativa com debounce e tratamento de fluxos assíncronos.
- **Vitest**: Testes unitários de alta performance.

## 📁 Estrutura do Projeto

- `src/app/core`: Tipagens (models) e serviços globais.
- `src/app/features`: Componentes principais da aplicação (Listagem e Formulário de Usuários).
- `src/app/exercises`: Implementações das seções teóricas 3.1 (Signals) e 3.2 (NgRx).
- `RESPOSTAS.md`: Documento com as respostas teóricas e refatorações solicitadas.

## 🚀 Como Executar

Garantir que possui o **Node.js (v20 ou superior)** instalado.

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Executar o projeto**:
    ```bash
    npm start
    ```
    A aplicação estará disponível em `http://localhost:4200`.

3.  **Executar testes**:
    ```bash
    npm test
    ```

## 📝 Decisões Técnicas

- **OnPush**: Todos os novos componentes foram concebidos para serem compatíveis com `ChangeDetectionStrategy.OnPush` para máxima performance.
- **Signals + computed**: Utilizados para derivar o estado da lista filtrada de usuários sem necessidade de subscrições manuais ou ciclos extras de detecção.
- **Reactive Forms**: Validação robusta e tipada para o formulário de usuários.
- **Zoneless**: A aplicação foi iniciada com foco na futura remoção do zone.js (padrão Angular 21).

---
Desenvolvido por **Henrique Gomes**.
