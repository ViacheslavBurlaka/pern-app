import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

// Components
import Login from './Login';

const LoginContainer = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        toast.success('Logged in Successfully');
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Login
      email={email}
      password={password}
      onChange={onChange}
      onSubmitForm={onSubmitForm}
    />
  );
};

export default LoginContainer;
