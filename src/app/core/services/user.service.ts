import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Estado privado usando Signals
  private usersSignal = signal<User[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@example.com',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999',
      phoneType: 'Celular'
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      cpf: '987.654.321-11',
      phone: '(21) 88888-8888',
      phoneType: 'Celular'
    }
  ]);

  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  // Exposição pública de Signals computados
  users = computed(() => this.usersSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  // Simulação de busca inicial
  loadUsers() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    
    // Simula uma chamada de API
    of(null).pipe(
      delay(800),
      tap(() => {
        this.loadingSignal.set(false);
      })
    ).subscribe();
  }

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 9)
    };
    this.usersSignal.update(users => [...users, newUser]);
  }

  updateUser(id: string, updatedData: Partial<User>) {
    this.usersSignal.update(users => 
      users.map(u => u.id === id ? { ...u, ...updatedData } : u)
    );
  }

  deleteUser(id: string) {
    this.usersSignal.update(users => users.filter(u => u.id !== id));
  }
}
