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
import TodoContainer from '../dashboard/TodoContainer';

const AppRouter = ({ setAuth, isAuthenticated }) => {
  return (
    <Router>
      <Switch>
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
        <Route
          exact
          path="/todo"
          render={(props) => <TodoContainer {...props} />}
        />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
