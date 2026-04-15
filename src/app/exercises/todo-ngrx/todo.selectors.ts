import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.model';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos) => todos.filter(t => !t.concluida)
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);
