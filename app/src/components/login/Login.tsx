import React from 'react';
import { Redirect, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';  // https://react-hook-form.com
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGN_IN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    Login(email: $email, password: $password)
  }
`;

export const Login = () => {
  let friendlyErrorMessage
  const [Login, { data, error }] = useMutation(SIGN_IN);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: 'rob@therobbrennan.com',
      password: 'testtest',
    }
  });

  const onSubmit = (data: any) => {
    Login({ variables: { email: data.email, password: data.password } }).catch(err => {
      console.error(`Unable to register a new user: ${err}`)
    });
  };

  if (error && error.message) {
    switch (true) {
      default:
        friendlyErrorMessage = `Unable to login. Either your password is incorrect, or you need to create an account.`
        break
    }
  }

  if (data) {
    localStorage.setItem("token", data.Login);
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      <h1>Login</h1>
      {error && error.message && (
        <p style={{ color: 'red' }}>{friendlyErrorMessage}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" ref={register} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" ref={register} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Need an account? Please <Link to="/register">register</Link>.</p>
    </>
  );
};

export default Login;