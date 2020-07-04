import React from 'react';
import FormTodo from './todolist/FormTodo';
import ListTodos from './todolist/ListTodos';
import { API_URL } from '../../constants';

const TodoContainer = ({ todos, setTodosChange, setAllTodos }) => {
  const addTodo = async (description) => {
    try {
      const body = {
        description
      };
      await fetch(`${API_URL}/dashboard/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          jwtToken: localStorage.token
        },
        body: JSON.stringify(body)
      });

      setTodosChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: {
          jwtToken: localStorage.token
        }
      });
      setAllTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const changeTodo = async (description, todo) => {
    try {
      const body = { description };
      await fetch(`${API_URL}/dashboard/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          jwtToken: localStorage.token
        },
        body: JSON.stringify(body)
      });

      setTodosChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="container">
      <FormTodo addTodo={addTodo} />
      <ListTodos
        todos={todos}
        deleteTodo={deleteTodo}
        changeTodo={changeTodo}
      />
    </div>
  );
};

export default TodoContainer;
