export interface Todo {
  id: number;
  tarefa: string;
  concluida: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}
