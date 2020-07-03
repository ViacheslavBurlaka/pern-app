import React, { useEffect, useState } from 'react';
import FormTodo from './todolist/FormTodo';
import ListTodos from './todolist/ListTodos';
import { API_URL } from '../../constants';

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // only one time fetched
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (description) => {
    try {
      const body = {
        description
      };
      await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      await getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const changeTodo = async (description, todo) => {
    try {
      const body = { description };
      await fetch(`${API_URL}/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      await getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5">Pern Todos List</h1>
      <FormTodo addTodo={addTodo} />
      <ListTodos
        todos={todos}
        setTodos={setTodos}
        deleteTodo={deleteTodo}
        changeTodo={changeTodo}
      />
    </>
  );
};

export default TodoContainer;
