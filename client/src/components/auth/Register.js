import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({ email, password, name, onSubmitForm, onChange }) => {
  return (
    <div className="container">
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link className="btn btn-sm btn-outline-primary mt-3" to="/login">
        login
      </Link>
    </div>
  );
};

export default Register;
