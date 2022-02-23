import MultiStepForm, { FormStep, RegisterModel } from '@frontend/components/Register/multiStepForm'
import { httpClient } from '@frontend/services'
import { UserCreationDTO } from '@libs/api'
import { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

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

const registerRequest = async (formData: UserCreationDTO) => {
  const { data } = await httpClient.post<UserCreationDTO>('/register', formData)
  return data
}

function Register() {
  const registerMutation = useMutation(registerRequest, {
    onSuccess: ({ username }) => {
      toast.success('Register successfully')
      router.push({
        pathname: './register/[username]',
        query: { username: username },
      })
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<RegisterModel> = async (data) => {
    await registerMutation.mutate({
      username: data.username,
      password: data.password,
      displayName: data.username,
      email: data.email,
    })
  }

  return (
    <MultiStepForm
      initialValues={{
        username: '',
        password: '',
        displayName: '',
        email: '',
        confirmPassword: '',
      }}
      onSubmit={onSubmit}
    >
      <FormStep
        stepName="Username"
        validationSchema={usernameValidation}
        header="Choose a Username"
        body1="Choose a username for your new account. "
        body2="You cannot change your username later."
      ></FormStep>
      <FormStep
        stepName="Email"
        validationSchema={emailValidation}
        header="Choose an email"
        body1="Choose an email for your new account."
        body2="You can always change your email later."
      ></FormStep>
      <FormStep
        stepName="Password"
        validationSchema={passwordValidation}
        header="Setup a new password"
        body1="Choosea secure password"
      ></FormStep>
    </MultiStepForm>
  )
}
export default Register
