import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron mt-5 container">
      <h1>Welcome to TodoApp</h1>
      <p>Sign In and start creating your todo list</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Register
      </Link>
    </div>
  );
};

export default Home;
