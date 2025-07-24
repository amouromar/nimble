'use client';

import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodo, TodoStatus } from '@/types/todo';

const STORAGE_KEY = 'todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      
      const parsed = JSON.parse(saved) as Array<Omit<Todo, 'createdAt' | 'updatedAt' | 'dueDate'> & {
        createdAt: string;
        updatedAt: string;
        dueDate?: string;
      }>;
      
      return parsed.map(todo => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    } catch (error) {
      console.error('Failed to parse todos from localStorage', error);
      return [];
    }
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos to localStorage', error);
      }
    }
  }, [todos]);

  const addTodo = useCallback(({ title, description, status = 'active', dueDate }: CreateTodo) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      dueDate,
      completed: status === 'completed',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTodos(prev => [...prev, newTodo]);
    return newTodo;
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              completed: !todo.completed,
              status: !todo.completed ? 'completed' : 'active',
              updatedAt: new Date() 
            }
          : todo
      )
    );
  }, []);

  const updateTodoStatus = useCallback((id: string, status: TodoStatus) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              status,
              completed: status === 'completed',
              updatedAt: new Date() 
            }
          : todo
      )
    );
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<CreateTodo>) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { 
              ...todo, 
              ...updates, 
              updatedAt: new Date(),
              completed: updates.status === 'completed' || (updates.status === undefined && todo.status === 'completed')
            }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => todo.status !== 'completed'));
  }, []);

  const getTodosByStatus = useCallback((status: TodoStatus | 'all') => {
    if (status === 'all') return todos;
    return todos.filter(todo => todo.status === status);
  }, [todos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    updateTodoStatus,
    updateTodo,
    deleteTodo,
    clearCompleted,
    getTodosByStatus,
  };
}