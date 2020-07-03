import React, { Fragment, useState } from 'react';

const FormTodo = ({ addTodo }) => {
  const [description, setDescription] = useState('');

  const [warning, setWarning] = useState(false);

  const onSubmitForm = (e) => {
    e.preventDefault();

    description.length === 0 ? setWarning(true) : setWarning(false);

    description.length > 0 && addTodo(description);

    setDescription('');
  };

  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          placeholder="Add todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
      {warning && (
        <div className="alert alert-warning mt-2 pt-1 pb-1">Add some todos</div>
      )}
    </Fragment>
  );
};

export default FormTodo;
