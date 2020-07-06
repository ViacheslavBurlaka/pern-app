import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// components
import AppRouter from './components/router/Router';
import AppProviders from './context/AppProviders';

// Notifications lib
toast.configure();

function App() {
  return (
    <>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </>
  );
}

export default App;
