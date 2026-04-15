import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { delay, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private usersSignal = signal<User[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  users = computed(() => this.usersSignal());
  loading = computed(() => this.loadingSignal());
  error = computed(() => this.errorSignal());

  loadUsers() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .get<User[]>('assets/users.json')
      .pipe(
        delay(800),
        tap((data) => {
          this.usersSignal.set(data);
          this.loadingSignal.set(false);
        }),
        catchError((err) => {
          this.errorSignal.set('Erro ao carregar usuários. Tente novamente mais tarde.');
          this.loadingSignal.set(false);
          return of([]);
        }),
      )
      .subscribe();
  }

  addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substring(2, 9),
    };
    this.usersSignal.update((users) => [...users, newUser]);
  }

  updateUser(id: string, updatedData: Partial<User>) {
    this.usersSignal.update((users) =>
      users.map((u) => (u.id === id ? { ...u, ...updatedData } : u)),
    );
  }

  deleteUser(id: string) {
    this.usersSignal.update((users) => users.filter((u) => u.id !== id));
  }
}
