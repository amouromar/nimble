'use client';

import { useState } from 'react';
import { Todo, TodoStatus } from '@/types/todo';
import { TodoItem } from './todo-item';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onUpdateStatus: (id: string, status: TodoStatus) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoList({ 
  todos, 
  onToggleTodo, 
  onUpdateStatus, 
  onDeleteTodo,
}: TodoListProps) {
  const [filter, setFilter] = useState<TodoStatus | 'all'>('all');

  const filteredTodos = filter === 'all' 
    ? todos 
    : todos.filter(todo => todo.status === filter);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center p-4 border-b">
        <h2 className="text-lg font-medium text-gray-800">My Todos</h2>
        <div className="flex space-x-2 overflow-auto">
          {(['all', 'active', 'scheduled', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-sm rounded-full ${
                filter === status
                  ? status === 'active'
                    ? 'bg-[#04579bff] text-white'
                    : status === 'scheduled'
                    ? 'bg-[#eeb63cff] text-yellow-800'
                    : status === 'completed'
                    ? 'bg-[#07561fff] text-green-200'
                    : status === 'cancelled'
                    ? 'bg-[#d83434ff] text-red-200'
                    : 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {filteredTodos.length === 0 ? (
        <div className="p-8 text-center text-sm font-semibold text-gray-500">
          No todos found. {filter === 'all' ? 'Add a new todo to get started!' : `No ${filter} todos.`}
        </div>
      ) : (
        <ul className="divide-y">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onUpdateStatus={onUpdateStatus}
              onDelete={onDeleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}