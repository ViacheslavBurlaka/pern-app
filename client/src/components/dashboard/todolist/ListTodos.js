import React, { Fragment } from 'react';

import EditTodo from './EditTodo';

const ListTodos = ({ todos, deleteTodo, changeTodo }) => {
  // sorted by id
  const todosSorted = todos.sort((a, b) => b.todo_id - a.todo_id);

  const todosMarkup =
    todosSorted.length > 0 && todosSorted[0].todo_id !== null ? (
      todosSorted.map((todo) => (
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          <td>
            <EditTodo todo={todo} changeTodo={changeTodo} />
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => deleteTodo(todo.todo_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td>No todos...</td>
      </tr>
    );

  return (
    <Fragment>
      <table className="table mt-4 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{todosMarkup}</tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
