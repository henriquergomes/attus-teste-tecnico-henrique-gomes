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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { PhonePipe } from '../../shared/pipes/phone.pipe';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

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
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatExpansionModule,
    CpfPipe,
    PhonePipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  protected userService = inject(UserService);
  private dialog = inject(MatDialog);

  viewMode = signal<'grid' | 'list'>('grid');
  searchControl = new FormControl('');
  searchTerm = signal('');

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.userService.users().filter((u) => u.name.toLowerCase().includes(term));
  });

  // Divide os usuários em duas colunas para o modo lista independente
  col1 = computed(() => this.filteredUsers().filter((_, i) => i % 2 === 0));
  col2 = computed(() => this.filteredUsers().filter((_, i) => i % 2 !== 0));

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((value) => {
        this.searchTerm.set(value ?? '');
      });
  }

  ngOnInit() {
    this.userService.loadUsers();
  }

  openForm(user?: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: user ? { ...user } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (user) {
          this.userService.updateUser(user.id, result);
        } else {
          this.userService.addUser(result);
        }
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Deseja realmente excluir o usuário ${user.name}? Esta ação não pode ser desfeita.`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id);
      }
    });
  }
}
