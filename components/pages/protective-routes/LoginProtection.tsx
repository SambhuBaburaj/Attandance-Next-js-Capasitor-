// components/ProtectedRoute.jsx
import { Redirect, Route } from 'react-router-dom';

export const LoginProtectedRoute = ({ children, ...rest }: any) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
console.log(user, 'user',user.role_id);
  if (token) {
    console.log("hi");
    // Redirect based on user role_id
    switch (user.role_id) {
      case 1:
        return <Redirect to="/admin" />;
      case 2:
        return <Redirect to="/teacher" />;
      case 3:
        return <Redirect to="/parents" />;
      default:
        return <Redirect to="/login" />; // Fallback in case role_id doesn't match
    }
  }

  return <Route {...rest}>{children}</Route>;
};
