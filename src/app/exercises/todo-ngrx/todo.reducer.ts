import { createReducer, on } from '@ngrx/store';
import { TodoState } from './todo.model';
import * as TodoActions from './todo.actions';

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false
  })),

  on(TodoActions.loadTodosError, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(TodoActions.toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo => 
      todo.id === id ? { ...todo, concluida: !todo.concluida } : todo
    )
  }))
);
