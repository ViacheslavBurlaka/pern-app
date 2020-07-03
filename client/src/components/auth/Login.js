import React from 'react';
import { Link } from 'react-router-dom';

const Login = ({ email, password, onSubmitForm, onChange }) => {
  return (
    <>
      <h1 className="mt-5 text-center">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link className="btn btn-sm btn-outline-primary mt-3" to="/register">
        register
      </Link>
    </>
  );
};

export default Login;
