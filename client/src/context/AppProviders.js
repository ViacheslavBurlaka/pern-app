import React from 'react';
import { AuthProvider } from './auth';

const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
