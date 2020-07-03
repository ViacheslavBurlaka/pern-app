import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

// components
import Dashboard from './Dashboard';

//components
// import FormTodo from './todolist/FormTodo';
// import ListTodos from './todolist/ListTodos';

const DashboardContainer = ({ setAuth }) => {
  const [name, setName] = useState('Your');

  // const [allTodos, setAllTodos] = useState([]);

  // const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/dashboard/`, {
        method: 'GET',
        headers: { jwtToken: localStorage.token }
      });

      const parseData = await res.json();

      // setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();

    try {
      localStorage.removeItem('token');

      setAuth(false);

      toast.success('Logout successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return <Dashboard name={name} logout={logout} />;
};

export default DashboardContainer;
