import React, { useState } from 'react';

// Components
import Login from './Login';

// context
import { useAuth } from '../../context/auth';

const LoginContainer = () => {
  const { login } = useAuth();

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

    const body = { email, password };

    await login(body);
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
