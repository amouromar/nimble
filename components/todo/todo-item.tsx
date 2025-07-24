'use client';

import { Todo, TodoStatus } from '@/types/todo';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;        // Add this
  onUpdateStatus: (id: string, status: TodoStatus) => void;  // Add this
  onDelete: (id: string) => void; 
}

export function TodoItem({ todo, onToggle, onUpdateStatus, onDelete }: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statusColors: Record<TodoStatus, string> = {
    active: 'bg-[#04579bff] text-white',
    scheduled: 'bg-[#eeb63cff] text-yellow-800',
    completed: 'bg-[#07561fff] text-green-200',
    cancelled: 'bg-[#d83434ff] text-red-200',
  };

  const statusLabels: Record<TodoStatus, string> = {
    active: 'Active',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <li 
      className="px-4 py-3 hover:bg-gray-50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowStatusMenu(false);
      }}
    >
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        />
        
        <div 
          className="ml-3 flex-1 min-w-0 cursor-pointer"
          onClick={() => setShowDescription(!showDescription)}
        >
          <div className="flex items-center">
            <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 font-semibold'}`}>
              {todo.title}
            </span>
            
            <span 
              className={`ml-2 text-xs px-2 py-0.5 font-bold rounded-full ${statusColors[todo.status]}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusMenu(!showStatusMenu);
              }}
            >
              {statusLabels[todo.status].toLowerCase()}
            </span>
            
            {showStatusMenu && (
              <div className="absolute mt-8 ml-2 z-10 w-32 bg-white rounded-md shadow-lg">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <button
                    key={status}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      todo.status === status ? 'bg-blue-50' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdateStatus(todo.id, status as TodoStatus);
                      setShowStatusMenu(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {todo.dueDate && (
            <div className="text-xs text-gray-500 font-bold mt-1">
              Due: {formatDate(todo.dueDate).split('T')[0]}
            </div>
          )}
          
          {todo.description && (showDescription || todo.description.length < 50) && (
            <div className="mt-1 text-sm text-gray-600">
              {todo.description}
            </div>
          )}
          
          <div className="mt-1 text-xs text-gray-400">
            Updated: {formatDate(todo.updatedAt).split('T')[0].split('-').reverse().join('-')}
          </div>
        </div>
        
        {(isHovered || todo.description) && (
          <div className="flex space-x-2 ml-2">
            {todo.description && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(!showDescription);
                }}
                className="px-2 rounded-lg text-xs text-gray-200 bg-gray-400"
                aria-label={showDescription ? 'Hide details' : 'Show details'}
              >
                {showDescription ? 'Hide' : 'Details'}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete todo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}