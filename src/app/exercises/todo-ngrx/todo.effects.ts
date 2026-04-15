import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError, switchMap, delay } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      switchMap(() => {
        // Mock de chamada HTTP
        // return this.http.get<Todo[]>('/api/todos').pipe(...)
        return of([
          { id: 1, tarefa: 'Estudar Angular 21', concluida: false },
          { id: 2, tarefa: 'Implementar NgRx', concluida: true }
        ]).pipe(
          delay(1000), // Simula latência de rede
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(error => of(TodoActions.loadTodosError({ error })))
        );
      })
    )
  );
}
