import { Button } from '@mui/material'
import * as yup from 'yup'

import React from 'react'

import InputField from '../components/Register/inputField'
import MultiStepForm, { FormStep } from '../components/Register/multiStepForm'

const usernameValidation = yup.object({
  username: yup.string().required('Please Enter a username'),
})

const emailValidation = yup.object({
  email: yup.string().email().required('Please Enter your Email'),
})

const passwordValidation = yup.object({
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  confirmPassword: yup
    .string()
    .required('Please Enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

function Register() {
  return (
    <div className="Register">
      <header className="Register-header">
        <MultiStepForm
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2))
          }}
        >
          <FormStep
            stepName="Username"
            validationSchema={usernameValidation}
            header="Choose Username"
            body1="Choose a username for your new account. "
            body2="You cannot change your username later."
          >
            <InputField name="username" label="Username" />
          </FormStep>
          <FormStep
            stepName="Email"
            validationSchema={emailValidation}
            header="Choose an email"
            body1="Choose an email for your new account."
            body2="You can always change your email later."
          >
            <InputField name="email" label="Email" />
          </FormStep>
          <FormStep
            stepName="Password"
            validationSchema={passwordValidation}
            header="Setup a new password"
            body1="Choosea secure password"
          >
            <InputField name="password" label="Password" type="password" />
            <InputField name="confirmPassword" label="Confirm password" type="password" />
          </FormStep>
        </MultiStepForm>
      </header>
    </div>
  )
}
export default Register
