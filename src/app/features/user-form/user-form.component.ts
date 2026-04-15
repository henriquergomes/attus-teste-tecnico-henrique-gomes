import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User, PhoneType } from '../../core/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar Usuário' : 'Novo Usuário' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="userForm" class="form-container">
        <mat-form-field appearance="outline">
          <mat-label>Nome Completo</mat-label>
          <input matInput formControlName="name" placeholder="Ex: João Silva">
          @if (userForm.get('name')?.hasError('required')) {
            <mat-error>Nome é obrigatório</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>E-mail</mat-label>
          <input matInput formControlName="email" type="email" placeholder="exemplo@email.com">
          @if (userForm.get('email')?.hasError('required')) {
            <mat-error>E-mail é obrigatório</mat-error>
          }
          @if (userForm.get('email')?.hasError('email')) {
            <mat-error>E-mail inválido</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>CPF</mat-label>
          <input matInput formControlName="cpf" placeholder="000.000.000-00">
          @if (userForm.get('cpf')?.hasError('required')) {
            <mat-error>CPF é obrigatório</mat-error>
          }
        </mat-form-field>

        <div class="phone-group">
          <mat-form-field appearance="outline" class="phone-type">
            <mat-label>Tipo</mat-label>
            <mat-select formControlName="phoneType">
              <mat-option value="Celular">Celular</mat-option>
              <mat-option value="Fixo">Fixo</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="phone-number">
            <mat-label>Telefone</mat-label>
            <input matInput formControlName="phone" placeholder="(00) 00000-0000">
            @if (userForm.get('phone')?.hasError('required')) {
              <mat-error>Telefone é obrigatório</mat-error>
            }
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="userForm.invalid" (click)="onSave()">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-top: 8px;
    }
    .phone-group {
      display: flex;
      gap: 12px;
    }
    .phone-type { width: 120px; }
    .phone-number { flex-grow: 1; }
  `]
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<UserFormComponent>);
  public data = inject<User>(MAT_DIALOG_DATA);

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', Validators.required],
    phone: ['', Validators.required],
    phoneType: ['Celular', Validators.required]
  });

  ngOnInit() {
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
