import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { Formik, Field, ErrorMessage } from 'formik'
import injectSheet from 'react-jss'
import cx from 'classnames'

import { FORM_INPUTS } from './constants/styleConstants'
import { colors } from './constants/colors'
import { RegisterValidation } from './form-validation/login'

const styles = {
  loginContainer: {
    width: 400,
    margin: [0, 'auto']
  },
  header: {
    fontSize: 48,
    flex: [1, 0, 0],
    color: colors.orange,
    fontWeight: 200,
    marginTop: 0,
    textAlign: 'center',
    letterSpacing: 5
  },
  centeredContainer: {
    display: 'flex',
    flex: [1, 0, 0],
    alignItems: 'center',
    flexDirection: 'column'
  },
  ...FORM_INPUTS
}

const REGISTER = gql`
  mutation RegisterMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    RegisterUser(email: $email, username: $username, password: $password) {
      id
    }
  }
`

const Register = ({ classes }) => {
  return (
    <div className={classes.loginContainer}>
      <h1 className={classes.header}>Register</h1>
      <Mutation mutation={REGISTER}>
        {(RegisterUser, { data, error }) => {
          let friendlyErrorMessage

          if (data && !!data.RegisterUser.id) {
            return <Redirect to={{ pathname: '/login' }} />
          }

          if (error && error.message) {
            switch (true) {
              case RegExp('already exists').test(error.message):
                friendlyErrorMessage = `Sorry, an account already exists for this user.`
                break
              default:
                friendlyErrorMessage = `Sorry. We are unable to create an account for this user.`
                break
            }
          }

          return (
            <Fragment>
              {error && error.message && (
                <p style={{ color: 'red' }}>{friendlyErrorMessage}</p>
              )}
              <Formik
                // TODO: Set initial values to be empty strings
                initialValues={{
                  email: 'rob@therobbrennan.com',
                  username: 'therobbrennan',
                  password: 'testtest',
                  confirmPassword: 'testtest'
                }}
                onSubmit={({ email, username, password }) => {
                  RegisterUser({
                    variables: { email, username, password }
                  })
                }}
                validationSchema={RegisterValidation}
              >
                {props => (
                  <form
                    onSubmit={props.handleSubmit}
                    className={classes.centeredContainer}
                  >
                    <label className={classes.label}>
                      <span>Email</span>
                      <Field
                        type='email'
                        name='email'
                        placeholder='Email'
                        className={classes.formField}
                      />
                      <ErrorMessage name='email' />
                    </label>
                    <label className={classes.label}>
                      <span>Username</span>
                      <Field
                        type='text'
                        name='username'
                        placeholder='Username'
                        className={classes.formField}
                      />
                      <ErrorMessage name='username' />
                    </label>
                    <label className={classes.label}>
                      <span>Password</span>
                      <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                        className={classes.formField}
                      />
                      <ErrorMessage name='password' />
                    </label>
                    <label className={classes.label}>
                      <span>Confirm Password</span>
                      <Field
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        className={classes.formField}
                      />
                      <ErrorMessage name='confirmPassword' />
                    </label>
                    <button type='submit' className={classes.button}>
                      Register
                    </button>
                  </form>
                )}
              </Formik>
              <div
                className={cx(
                  classes.centeredContainer,
                  classes.oauthContainer
                )}
              >
                <div>- OR - </div>
                <a
                  href={process.env.FB_AUTH_URI}
                  className={cx(classes.button, classes.facebookLogin)}
                >
                  <i className='fab fa-facebook-f' /> Register with Facebook
                </a>
              </div>
            </Fragment>
          )
        }}
      </Mutation>
    </div>
  )
}

export default injectSheet(styles)(Register)
