import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { signal, computed } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { User } from '../../core/models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: any;
  let mockDialog: any;

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@test.com',
      cpf: '111',
      phone: '111',
      phoneType: 'Celular',
    },
    { id: '2', name: 'Bob', email: 'bob@test.com', cpf: '222', phone: '222', phoneType: 'Fixo' },
  ];

  beforeEach(async () => {
    // Mock do UserService usando Signals
    const usersSignal = signal<User[]>(mockUsers);
    mockUserService = {
      users: computed(() => usersSignal()),
      loading: signal(false),
      error: signal(null),
      loadUsers: vi.fn(),
      addUser: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    mockDialog = {
      open: vi.fn().mockReturnValue({
        afterClosed: () => of(null),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [UserListComponent, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    })
      .overrideProvider(MatDialog, { useValue: mockDialog })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(mockUserService.loadUsers).toHaveBeenCalled();
  });

  it('should filter users by name', () => {
    vi.useFakeTimers();
    component.searchControl.setValue('Ali');
    vi.advanceTimersByTime(300); // debounceTime

    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Alice');

    component.searchControl.setValue('NonExistent');
    vi.advanceTimersByTime(300);
    expect(component.filteredUsers().length).toBe(0);
    vi.useRealTimers();
  });

  it('should toggle view mode', () => {
    expect(component.viewMode()).toBe('grid');
    component.viewMode.set('list');
    expect(component.viewMode()).toBe('list');
  });

  it('should split users into two columns for list view', () => {
    // Alice (index 0) -> col1, Bob (index 1) -> col2
    expect(component.col1().length).toBe(1);
    expect(component.col1()[0].name).toBe('Alice');
    expect(component.col2().length).toBe(1);
    expect(component.col2()[0].name).toBe('Bob');
  });

  it('should open UserFormComponent when clicking add', () => {
    component.openForm();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open ConfirmDialogComponent when clicking delete', () => {
    component.deleteUser(mockUsers[0]);
    expect(mockDialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        data: expect.objectContaining({ title: 'Confirmar Exclusão' }),
      }),
    );
  });
});
