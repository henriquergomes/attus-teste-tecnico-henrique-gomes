import { Component, signal, computed, effect, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../core/interfaces/item.interface';

@Component({
  selector: 'app-signals-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signals-counter.html',
})
export class SignalsCounterComponent {
  itens = signal<Item[]>([
    { id: 1, nome: 'Café', preco: 10, quantidade: 1 },
    { id: 2, nome: 'Pão', preco: 5, quantidade: 2 },
  ]);

  totalMudou = output<number>();

  constructor() {
    effect(() => {
      this.totalMudou.emit(this.total());
    });
  }

  total = computed(() => this.itens().reduce((acc, item) => acc + item.quantidade * item.preco, 0));

  adicionar(id: number) {
    this.itens.update((lista) =>
      lista.map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item)),
    );
  }

  remover(id: number) {
    this.itens.update((lista) =>
      lista.map((item) =>
        item.id === id && item.quantidade > 0 ? { ...item, quantidade: item.quantidade - 1 } : item,
      ),
    );
  }
}
