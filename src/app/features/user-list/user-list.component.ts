import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="list-container">
      <header class="list-header">
        <h1>Gerenciamento de Usuários</h1>
        <button mat-fab color="warn" class="add-button" (click)="openForm()">
          <mat-icon>add</mat-icon>
        </button>
      </header>

      <div class="filter-section">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Filtrar por nome</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Digite um nome...">
          <mat-icon matPrefix>search</mat-icon>
        </mat-form-field>
      </div>

      @if (userService.loading()) {
        <div class="loading-state">
          <mat-progress-spinner mode="indeterminate" diameter="40"></mat-progress-spinner>
          <p>Carregando usuários...</p>
        </div>
      } @else if (userService.error()) {
        <div class="error-state">
          <mat-icon color="error">error</mat-icon>
          <p>{{ userService.error() }}</p>
        </div>
      } @else {
        <div class="user-grid">
          @for (user of filteredUsers(); track user.id) {
            <mat-card class="user-card">
              <mat-card-header>
                <div mat-card-avatar class="avatar">
                  {{ user.name.charAt(0) }}
                </div>
                <mat-card-title>{{ user.name }}</mat-card-title>
                <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-actions align="end">
                <button mat-button color="primary" (click)="openForm(user)">
                  <mat-icon>edit</mat-icon> EDITAR
                </button>
              </mat-card-actions>
            </mat-card>
          } @empty {
            <p class="empty-state">Nenhum usuário encontrado.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .list-container { padding: 24px; max-width: 1200px; margin: 0 auto; }
    .list-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 32px; 
    }
    .filter-section { margin-bottom: 24px; }
    .search-field { width: 100%; max-width: 400px; }
    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .user-card { transition: transform 0.2s; }
    .user-card:hover { transform: translateY(-4px); }
    .avatar {
      background-color: #3f51b5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      border-radius: 50%;
    }
    .loading-state, .error-state, .empty-state {
      text-align: center;
      padding: 48px;
    }
  `]
})
export class UserListComponent implements OnInit {
  protected userService = inject(UserService);
  private dialog = inject(MatDialog);

  searchControl = new FormControl('');
  searchTerm = signal('');

  // Computed signal para a lista filtrada
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.userService.users().filter(u => 
      u.name.toLowerCase().includes(term)
    );
  });

  constructor() {
    // Escutar mudanças no campo de busca com debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(value => {
      this.searchTerm.set(value ?? '');
    });
  }

  ngOnInit() {
    this.userService.loadUsers();
  }

  openForm(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user ? { ...user } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          this.userService.updateUser(user.id, result);
        } else {
          this.userService.addUser(result);
        }
      }
    });
  }
}
