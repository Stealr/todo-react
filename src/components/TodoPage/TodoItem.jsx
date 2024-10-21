// src/components/TodoItem.jsx
import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo  }) {
    return (
        <div class="task">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span id="task">{todo.title}</span>
            <button id="del" onClick={() => removeTodo(todo.id)}>X</button>
        </div>
    );
} 
export default TodoItem;