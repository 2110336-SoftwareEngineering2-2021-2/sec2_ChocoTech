import InputField from '@frontend/components/Register/inputField'
import MultiStepForm, { FormStep } from '@frontend/components/Register/multiStepForm'
import { Container, styled } from '@mui/material'
import axios from 'axios'
import router from 'next/router'
import * as yup from 'yup'

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

const StyledContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
  min-height: 600px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`
const baseURL = 'https://dev.choco.saenyakorn.dev/api/register'

function Register() {
  return (
    <MultiStepForm
      initialValues={{
        username: '',
        password: '',
        displayName: '',
        email: '',
      }}
      onSubmit={(values) => {
        values.displayName = values.username
        axios
          .post(baseURL, JSON.stringify(values, null, 2))
          .then(function (response) {
            if (response.status === 201) {
              router.push({ pathname: './register/complete' })
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }}
    >
      <FormStep
        stepName="Username"
        validationSchema={usernameValidation}
        header="Choose a Username"
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
  )
}
export default Register
