import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

// components
import Register from './Register';

const RegisterContainer = ({ setAuth }) => {
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
    try {
      const body = { email, password, name };
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      console.log('Server response: ', parseRes);

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken);
        setAuth(true);
        toast.success('Register Successfully');
      } else {
        setAuth(false);
        toast.error(parseRes, { autoClose: 5000 });
      }
    } catch (err) {
      console.error(err.message);
    }
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
