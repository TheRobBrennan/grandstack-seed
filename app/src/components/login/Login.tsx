import React from 'react';
import { Redirect } from "react-router-dom";
import { useForm } from 'react-hook-form';  // https://react-hook-form.com
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGN_IN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password)
  }
`;

export const Login = () => {
  const [Login, { data }] = useMutation(SIGN_IN);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: 'rob@therobbrennan.com',
      password: 'testtest',
    }
  });

  const onSubmit = (data: any) => {
    Login({ variables: { email: data.username, password: data.password } });
  };

  if (data) {
    localStorage.setItem("token", data.Login);
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input name="username" ref={register} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" ref={register} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;