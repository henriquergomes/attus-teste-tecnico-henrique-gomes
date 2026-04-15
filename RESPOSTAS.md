# Respostas - Teste Técnico Attus

Este documento contém as respostas para as seções teóricas e exercícios de refatoração do desafio.

---

## 1. TypeScript e Qualidade de Código

### 1.1. Refatoração da Classe Verdureira

Abaixo estão as melhorias aplicadas:
- Uso de interfaces para tipagem forte.
- Substituição de loops `for` por métodos de array modernos (`find`, `some`).
- Melhoria na legibilidade e redução de duplicidade de código com um método privado `getProdutoPorId`.
- Uso de template strings para formatação.

```typescript
interface IProduto {
  id: number;
  descricao: string;
  quantidadeEstoque: number;
}

class Produto implements IProduto {
  constructor(
    public readonly id: number,
    public readonly descricao: string,
    public readonly quantidadeEstoque: number
  ) {}
}

class Verdureira {
  private readonly produtos: IProduto[];

  constructor() {
    this.produtos = [
      new Produto(1, 'Maçã', 20),
      new Produto(2, 'Laranja', 0),
      new Produto(3, 'Limão', 20)
    ];
  }

  private getProdutoPorId(id: number): IProduto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  getDescricaoProduto(produtoId: number): string {
    const produto = this.getProdutoPorId(produtoId);
    if (!produto) return 'Produto não encontrado';
    
    return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
  }

  hasEstoqueProduto(produtoId: number): boolean {
    const produto = this.getProdutoPorId(produtoId);
    return (produto?.quantidadeEstoque ?? 0) > 0;
  }
}
```

### 1.2. Generics e tipos utilitários

```typescript
interface PaginaParams {
  pagina: number;
  tamanho: number;
}

interface Pagina<T> {
  itens: T[];
  total: number;
}

function filtrarEPaginar<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  params: PaginaParams
): Pagina<T> {
  const filtrados = data.filter(filterFn);
  const inicio = (params.pagina - 1) * params.tamanho;
  const fim = inicio + params.tamanho;
  
  return {
    itens: filtrados.slice(inicio, fim),
    total: filtrados.length
  };
}

// Exemplo de uso:
interface Usuario { id: number; nome: string; }
const usuarios: Usuario[] = [
  { id: 1, nome: 'Alice' },
  { id: 2, nome: 'Bob' },
  { id: 3, nome: 'Arthur' }
];

const resultado = filtrarEPaginar(
  usuarios,
  u => u.nome.startsWith('A'),
  { pagina: 1, tamanho: 10 }
);
```

---

## 2. Angular — Fundamentos e Reatividade

### 2.1. Change Detection e OnPush

**Problema:** O Angular com `OnPush` só verifica mudanças se houver uma nova referência em um `@Input`, a emissão de um `@Output` dentro do componente, ou se um evento (como clique) for disparado pelo próprio componente. O `subscribe` assíncrono e o `setInterval` ocorrem fora do fluxo que o `OnPush` monitora automaticamente.

**Correção:** Usar `ChangeDetectorRef` para marcar manualmente ou, preferencialmente, o `AsyncPipe` (que já lida com o `markForCheck`).

```typescript
// Correção Proposta
import { ChangeDetectorRef } from '@angular/core';

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(
    private readonly pessoaService: PessoaService,
    private readonly cdr: ChangeDetectorRef // Injetar
  ) {}

  ngOnInit(): void {
    this.subscriptionBuscarPessoa = this.pessoaService.buscarPorId(1).subscribe((pessoa) => {
      this.texto = `Nome: ${pessoa.nome}`;
      this.cdr.markForCheck(); // Notificar Angular da mudança
    });
  }
}
```

### 2.2. RxJS — eliminando subscriptions aninhadas

**Escolha de operador:** `switchMap`. Ele é ideal para buscar dados relacionados, pois cancela a busca anterior caso o ID mude e achata o Observable, resultando em um único fluxo limpo.

```typescript
ngOnInit(): void {
  const pessoaId = 1;

  this.pessoaService.buscarPorId(pessoaId).pipe(
    switchMap(pessoa => 
      this.pessoaService.buscarQuantidadeFamiliares(pessoa.id).pipe(
        map(qtd => ({ pessoa, qtd }))
      )
    ),
    takeUntilDestroyed() // Evita leak
  ).subscribe(({ pessoa, qtd }) => {
    this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
  });
}
```

### 2.3. RxJS — busca com debounce (Implementação Completa)

**Serviço:**
```typescript
@Injectable({ providedIn: 'root' })
export class SearchService {
  search(term: string) {
    return this.http.get<any[]>(`/api/search?q=${term}`);
  }
}
```

**Componente:**
```typescript
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <input [formControl]="searchControl" placeholder="Buscar...">
    @if (loading()) { <p>Carregando...</p> }
    <ul>
      @for (item of results$ | async; track item.id) {
        <li>{{ item.name }}</li>
      }
    </ul>
  `
})
export class SearchComponent {
  searchControl = new FormControl('');
  loading = signal(false);

  results$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    tap(() => this.loading.set(true)),
    switchMap(term => this.service.search(term ?? '').pipe(
      catchError(() => of([])),
      finalize(() => this.loading.set(false))
    ))
  );

  constructor(private service: SearchService) {}
}
```

### 2.4. Performance — OnPush e trackBy

- **trackBy:** Melhora a performance ao informar ao Angular como identificar itens únicos. Sem ele, o Angular recria todos os elementos do DOM se a referência do array mudar. Com ele, apenas as mudanças reais são refletidas no DOM.
- **OnPush:** Reduz ciclos pois o Angular pula a verificação de toda a subárvore do componente a menos que as entradas mudem. Em listas grandes, evita milhares de verificações desnecessárias a cada movimento do mouse ou timer global.
- **Estratégia Default:** Em listas centenas de itens, qualquer evento no sistema (scroll, mousemove, timers) dispararia uma verificação em cada campo de cada item da lista, gerando gargalos de CPU.

---

## 3. Gerenciamento de Estado

As implementações práticas das Seções 3.1 (Signals Counter) e 3.2 (NgRx Todo) foram criadas como componentes standalone no código fonte do projeto para melhor visualização.
