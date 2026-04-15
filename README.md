# Teste Técnico Attus - Frontend

Este projeto foi desenvolvido como parte do processo seletivo da Attus. A aplicação demonstra conhecimentos em Angular 21, Angular Material 21, RxJS, NgRx e Angular Signals.

## 🛠 Tecnologias Utilizadas

- **Angular 21**: Versão mais recente do framework, utilizando componentes Standalone e Controle de Fluxo nativo (`@if`, `@for`).
- **Angular Material 21**: Componentes de UI modernos e acessíveis.
- **NgRx 21**: Gerenciamento de estado global (implementado na feature de To-do).
- **Angular Signals**: Gerenciamento de estado reativo e granular (implementado na listagem de usuários e no contador).
- **RxJS**: Operadores avançados para busca reativa com debounce e tratamento de fluxos assíncronos.
- **Vitest**: Testes unitários de alta performance.

## 🎨 Padronização de Código (Clean Code)

O projeto já vem configurado para garantir a consistência do código automaticamente:

- **Prettier**: Configurado via `.prettierrc` para as melhores práticas de indentação e estilo.
- **EditorConfig**: Garante que diferentes editores sigam as mesmas regras de espaçamento.
- **Auto-format**: O projeto inclui configurações de workspace para o VS Code (`.vscode/settings.json`) que ativam o **Formatar ao Salvar** automaticamente.
- **Script de Formatação**: Você pode formatar todo o projeto a qualquer momento com o comando:
  ```bash
  npm run format
  ```

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
