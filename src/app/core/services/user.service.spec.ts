import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

    // Suprime o delay nos testes para evitar timeouts
    vi.useFakeTimers();
  });

  afterEach(() => {
    httpMock.verify();
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users from assets/users.json', async () => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John',
        email: 'john@test.com',
        cpf: '123',
        phone: '123',
        phoneType: 'Celular',
      },
    ];

    service.loadUsers();

    const req = httpMock.expectOne('assets/users.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    // Avança o delay(800)
    vi.advanceTimersByTime(800);

    expect(service.users()).toEqual(mockUsers);
    expect(service.loading()).toBe(false);
  });

  it('should handle error when loading users', () => {
    service.loadUsers();

    const req = httpMock.expectOne('assets/users.json');
    req.error(new ProgressEvent('error'));

    vi.advanceTimersByTime(800);

    expect(service.error()).toBe('Erro ao carregar usuários. Tente novamente mais tarde.');
    expect(service.loading()).toBe(false);
  });

  it('should add a new user', () => {
    const newUser: Omit<User, 'id'> = {
      name: 'New User',
      email: 'new@test.com',
      cpf: '456',
      phone: '456',
      phoneType: 'Celular',
    };

    service.addUser(newUser);
    const users = service.users();

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('New User');
    expect(users[0].id).toBeDefined();
  });

  it('should update a user', () => {
    const initialUser: User = {
      id: '123',
      name: 'Old',
      email: 'old@test.com',
      cpf: '1',
      phone: '1',
      phoneType: 'Celular',
    };
    // @ts-ignore - access private to set initial state for unit test
    service['usersSignal'].set([initialUser]);

    service.updateUser('123', { name: 'Updated' });

    expect(service.users()[0].name).toBe('Updated');
  });

  it('should delete a user', () => {
    const initialUser: User = {
      id: '123',
      name: 'Delete Me',
      email: 'd@test.com',
      cpf: '1',
      phone: '1',
      phoneType: 'Celular',
    };
    // @ts-ignore
    service['usersSignal'].set([initialUser]);

    service.deleteUser('123');

    expect(service.users().length).toBe(0);
  });
});
