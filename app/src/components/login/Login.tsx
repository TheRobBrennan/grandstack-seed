import React from 'react';
import { useForm } from 'react-hook-form';  // https://react-hook-form.com

export const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: 'rob@therobbrennan.com',
      password: 'testtest',
    }
  });

  const onSubmit = (data: any) => {
    // TODO: Remove logging
    console.log(JSON.stringify(data, null, 2));
  };

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