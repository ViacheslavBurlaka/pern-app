import React, { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

// components
import Dashboard from './Dashboard';
import TodoContainer from './TodoContainer';

// context
import { useAuth } from '../../context/auth';

const DashboardContainer = () => {
  const { logout } = useAuth();

  const [name, setName] = useState('Your');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/`, {
        method: 'GET',
        headers: { jwtToken: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  // getProfile call once at 1st render
  useEffect(() => {
    getProfile();
  }, []);

  // getProfile call always when todosChange === true
  useEffect(() => {
    setTodosChange(false);
    if (todosChange) getProfile();
  }, [todosChange]);

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <>
      <Dashboard name={name} logout={(e) => handleLogout(e)} />
      <TodoContainer
        todos={allTodos}
        setTodosChange={setTodosChange}
        setAllTodos={setAllTodos}
      />
    </>
  );
};

export default DashboardContainer;
