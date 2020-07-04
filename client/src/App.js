import React, { Fragment, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { API_URL } from './constants';

// components
import AppRouter from './components/router/Router';

// Notifications lib
toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

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

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Fragment>
      <AppRouter setAuth={setAuth} isAuthenticated={isAuthenticated} />
    </Fragment>
  );
}

export default App;
