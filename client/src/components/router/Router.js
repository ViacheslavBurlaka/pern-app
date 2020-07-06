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
import { useAuth } from '../../context/auth';

// TODO: lazy loading (split bundles)
// const LoginContainer = React.lazy(() => import('../auth/LoginContainer'));

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

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
              <LoginContainer {...props} />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <RegisterContainer {...props} />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <DashboardContainer {...props} />
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
