export type TodoStatus = 'active' | 'scheduled' | 'completed' | 'cancelled';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  status: TodoStatus;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
}

export interface CreateTodo {
  title: string;
  description?: string;
  status?: TodoStatus;
  dueDate?: Date;
}
