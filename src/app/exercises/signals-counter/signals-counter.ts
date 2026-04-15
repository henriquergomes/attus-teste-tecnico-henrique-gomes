import { Component, signal, computed, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Item {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

@Component({
  selector: 'app-signals-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container">
      <h3>Carrinho (Signals)</h3>
      <ul>
        @for (item of itens(); track item.id) {
          <li>
            {{ item.nome }} - {{ item.quantidade }}x R$ {{ item.preco }}
            <button (click)="remover(item.id)">-</button>
            <button (click)="adicionar(item.id)">+</button>
          </li>
        }
      </ul>
      <p><strong>Total: R$ {{ total() }}</strong></p>
    </div>
  `
})
export class SignalsCounterComponent {
  // Signal para a lista de itens
  itens = signal<Item[]>([
    { id: 1, nome: 'Café', preco: 10, quantidade: 1 },
    { id: 2, nome: 'Pão', preco: 5, quantidade: 2 }
  ]);

  // Computed para o total (quantidade × preço)
  total = computed(() => 
    this.itens().reduce((acc, item) => acc + (item.quantidade * item.preco), 0)
  );

  // Output que emite sempre que o total mudar
  totalMudou = output<number>();

  constructor() {
    // Efeito para emitir o output sempre que o computed 'total' mudar
    effect(() => {
      this.totalMudou.emit(this.total());
    });
  }

  adicionar(id: number) {
    this.itens.update(lista => lista.map(item => 
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ));
  }

  remover(id: number) {
    this.itens.update(lista => lista.map(item => 
      item.id === id && item.quantidade > 0 
        ? { ...item, quantidade: item.quantidade - 1 } 
        : item
    ).filter(item => item.quantidade > 0));
  }
}
