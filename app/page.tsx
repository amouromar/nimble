'use client';

import { TodoForm } from '../components/todo/todo-form';
import { TodoList } from '../components/todo/todo-list';
import { useTodos } from '../hooks/use-todos';

export default function Home() {
  const { todos, addTodo, toggleTodo, updateTodoStatus, deleteTodo } = useTodos();

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col">
      <div className="max-w-2xl mx-auto flex-1 w-full">
        <div className='flex flex-row justify-center items-center'>
          <h1 className="text-7xl font-bold text-center text-gray-800 mb-8">nimble</h1>
          {/* <Image src="/logo.svg" alt="Logo" width={40} height={40} className='mb-12'/> */}
        </div>
        
        <div className="rounded-lg p-6 mb-6">
          <TodoForm onAddTodo={addTodo} />
        </div>

        <hr className='mb-6 bg-gray-200 h-0.5'/>
        
        <div className="rounded-lg overflow-hidden mb-6">
          <TodoList 
            todos={todos}
            onToggleTodo={toggleTodo}
            onUpdateStatus={updateTodoStatus}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </div>
      
      <footer className="text-center text-xs text-gray-500 mt-auto py-4">
        <p className="mt-1 text-xs font-satoshi-light">Made by Amour Omar</p>
      </footer>
    </main>
  );
}
