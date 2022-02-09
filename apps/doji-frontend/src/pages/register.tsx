import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { AppBar, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'

import React from 'react'

import InputField from '../components/Register/inputField'
import MultiStepForm, { FormStep } from '../components/Register/multiStepForm'

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
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
            onSubmit={() => console.log('Step 1')}
            validationSchema={validationSchema}
          >
            <InputField name="username" label="Username" />
          </FormStep>
          <FormStep
            stepName="Email"
            onSubmit={() => console.log('Step 2')}
            validationSchema={validationSchema}
          >
            <InputField name="email" label="Email" />
          </FormStep>
          <FormStep
            stepName="Password"
            onSubmit={() => console.log('Step 3')}
            validationSchema={validationSchema}
          >
            <InputField name="password" label="Password" />
          </FormStep>
        </MultiStepForm>
      </header>
    </div>
  )
}
export default Register
