import React from 'react';
import { Redirect } from "react-router-dom";
import { logout } from '../../lib/logout';

export const Logout = () => {
  logout();
  return <Redirect to={{ pathname: "/" }} />;
};

export default Logout;