import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = {
      close: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form as empty in creation mode', () => {
    expect(component.userForm.get('name')?.value).toBe('');
    expect(component.userForm.valid).toBe(false);
  });

  it('should show validation errors when form is touched and empty', () => {
    const nameControl = component.userForm.get('name');
    nameControl?.markAsTouched();
    expect(nameControl?.hasError('required')).toBe(true);
  });

  it('should be valid when all required fields are filled correctly', () => {
    component.userForm.patchValue({
      name: 'Test',
      email: 'test@test.com',
      cpf: '12345678901',
      phone: '11999998888',
      phoneType: 'Celular',
    });
    expect(component.userForm.valid).toBe(true);
  });

  it('should show error for invalid email', () => {
    const emailControl = component.userForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
  });

  it('should close dialog with form data onSave when form is valid', () => {
    const validData = {
      name: 'Test',
      email: 'test@test.com',
      cpf: '123',
      phone: '123',
      phoneType: 'Celular',
    };
    component.userForm.patchValue(validData);
    component.onSave();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validData);
  });

  it('should not close dialog onSave if form is invalid', () => {
    component.onSave();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close dialog without data onCancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });
});

describe('UserFormComponent Edit Mode', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const editData = {
    id: '1',
    name: 'Existing User',
    email: 'existing@test.com',
    cpf: '111',
    phone: '111',
    phoneType: 'Fixo',
  };

  beforeEach(async () => {
    const mockDialogRef = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [UserFormComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: editData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should patch form values with data from MAT_DIALOG_DATA', () => {
    expect(component.userForm.get('name')?.value).toBe(editData.name);
    expect(component.userForm.get('email')?.value).toBe(editData.email);
  });
});
