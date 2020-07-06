import React, { useContext, useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { toast } from 'react-toastify';

// components
import Loader from '../components/ui/Loader';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const [isLoading, setIsLoading] = useState(true);

  // Check if user's token is verified
  const isAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          jwtToken: localStorage.token
        }
      });

      // response === true or false
      const parseData = await response.json();

      // user verified => authenticated => true
      parseData === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (e) {
      console.error(e);
    }
  };

  // for login and register request
  const submitForm = async ({ url, body, msg }) => {
    try {
      const response = await fetch(`${API_URL}${url}`, {
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
        toast.success(msg);
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // clear the token in localStorage and the user data
  const logout = async () => {
    try {
      localStorage.removeItem('token');

      setAuth(false);

      toast.success('Logout successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  // login post request
  const login = async (body) =>
    submitForm({
      url: '/auth/login',
      msg: 'Logged in Successfully',
      body
    });

  // register post request
  const register = (body) =>
    submitForm({
      url: '/auth/register',
      msg: 'Register Successfully',
      body
    });

  // when app init => call side effect => to check if user is authenticated
  useEffect(() => {
    isAuth().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        login,
        register
      }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
