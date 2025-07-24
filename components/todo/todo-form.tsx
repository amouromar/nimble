"use client";

import { useState } from "react";
import { TodoStatus } from "@/types/todo";

type TodoFormProps = {
  onAddTodo: (todo: {
    title: string;
    description: string;
    status: TodoStatus;
    dueDate?: Date;
  }) => void;
};

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("active");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo({
      title: title.trim(),
      description: description.trim(),
      status,
      ...(dueDate && { dueDate: new Date(dueDate) }),
    });

    setTitle("");
    setDescription("");
    setStatus("active");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-transparent">
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 border-2 text-lg text-gray-600 font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400"
            aria-label="Todo title"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details (optional)"
            className="w-full px-4 py-2 border-2 text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400 min-h-[100px] resize-vertical"
            aria-label="Todo description"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TodoStatus)}
              className="w-full px-3 py-2 text-gray-600 font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="active" className="text-gray-500">
                Active
              </option>
              <option value="scheduled" className="text-gray-500">
                Scheduled
              </option>
              <option value="completed" className="text-gray-500">
                Completed
              </option>
              <option value="cancelled" className="text-gray-500">
                Cancelled
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date (optional)
            </label>
            <input
              type="datetime-local"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 text-gray-600 font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-fit px-4 py-2 bg-[#06755b] font-bold text-white rounded-lg"
            disabled={!title.trim()}
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
