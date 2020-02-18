import React from 'react';

interface LoginProps {
  message?: string,
}

export const Login: React.FC<LoginProps> = ({ message = '' }) => {
  return (<div>A login form<br />{message}</div>);
};

export default Login;