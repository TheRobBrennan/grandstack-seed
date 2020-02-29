import React from 'react';
import { Redirect } from "react-router-dom";
import { logout } from '../../lib/remove-authentication-token';

export const Logout = () => {
  logout();
  return <Redirect to={{ pathname: "/" }} />;
};

export default Logout;