interface TodoItemProps {
    todo: TodoItem;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-4 h-4 mr-4 rounded border-gray-600"
          />
          <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
            {todo.text}
          </span>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    );
  }