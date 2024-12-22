// components/ProtectedRoute.jsx
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }:any) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};

