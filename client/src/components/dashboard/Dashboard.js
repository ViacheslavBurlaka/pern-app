import React from 'react';

const Dashboard = ({ name, logout }) => {
  return (
    <>
      <div className="mt-5">
        <h1>Dashboard</h1>
        <h2>{name} 's Todos List</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
