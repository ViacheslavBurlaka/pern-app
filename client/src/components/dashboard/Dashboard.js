import React from 'react';

const Dashboard = ({ name, logout }) => {
  return (
    <>
      <header className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">PERN TodoApp</span>

          <button onClick={(e) => logout(e)} className="btn btn-primary">
            Logout
          </button>
        </div>
      </header>
      <div className="container mt-5">
        <h1>
          <mark>{name}</mark>'s Todos List
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
