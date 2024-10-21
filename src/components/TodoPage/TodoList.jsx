// src/components/TodoList.jsx
import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, toggleTodo, removeTodo  }) {
    return (
        <div class="todolist">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
            ))}
        </div>
    );
}
export default TodoList;