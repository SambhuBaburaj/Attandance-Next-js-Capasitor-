
// components/RoleRoute.jsx
import { Redirect, Route } from 'react-router-dom';
export const RoleRoute = ({ allowedRoles, children, ...rest }:any) => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  console.log(allowedRoles);
  console.log(user);
  if (!allowedRoles.includes(user.role_id)) {
    return <Redirect to="/unauthorized" />;
  }

  return <Route {...rest}>{children}</Route>;
};
