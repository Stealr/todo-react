// src/App.jsx
import React, { useState } from 'react';
import TodoList from '/src/components/TodoPage/TodoList';
import { Link } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Read a book', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');


  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function addTodo(e) {
    e.preventDefault();
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos(todos.concat(newTodoItem));
    setNewTodo('');
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleInputChange(e) {
    setNewTodo(e.target.value);
  }

  function changeFilter(newFilter) {
    setFilter(newFilter);
  }

  function clearall() {
    setTodos([]);
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return ( 
    <div class="window">
      <div class="top">
      <Link to="/dnd">Go to DnD Page</Link>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Add new task..."
          />
          <button type="submit">Add</button>
        </form>

        <div class="filters">
          <ul>
            <li
              id="all"
              onClick={() => changeFilter('all')}>
              All
            </li>
            <li
              id="pending"
              onClick={() => changeFilter('pending')}>
              not done
            </li>
            <li
              id="completed"
              onClick={() => changeFilter('completed')}>
              done
            </li>
            <li><button class="clear-btn" onClick={clearall}>Clear all</button></li>
          </ul>
        </div>
      </div>
      <div class="bottom">
        <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
      </div>
    </div>
    
  );
}

export default App;
