import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// components
import LoginContainer from '../auth/LoginContainer';
import RegisterContainer from '../auth/RegisterContainer';
import DashboardContainer from '../dashboard/DashboardContainer';
import Home from '../dashboard/Home';

const AppRouter = ({ setAuth, isAuthenticated }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            isAuthenticated ? <Redirect to="/dashboard" /> : <Home {...props} />
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <LoginContainer {...props} setAuth={setAuth} />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/login" />
            ) : (
              <RegisterContainer {...props} setAuth={setAuth} />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <DashboardContainer {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
