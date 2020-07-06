import React, { useState } from 'react';

// components
import Register from './Register';

// context
import { useAuth } from '../../context/auth';

const RegisterContainer = () => {
  const { register } = useAuth();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const body = { email, password, name };

    await register(body);
  };

  return (
    <Register
      email={email}
      name={name}
      password={password}
      onSubmitForm={onSubmitForm}
      onChange={onChange}
    />
  );
};

export default RegisterContainer;
