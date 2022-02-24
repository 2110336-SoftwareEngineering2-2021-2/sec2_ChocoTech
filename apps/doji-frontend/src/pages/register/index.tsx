import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserCreationRequestDTO } from '@libs/api'
import { TopBarActionType } from '@libs/mui'
import { Button, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const registerValidation = yup.object({
  username: yup.string().required('Please Enter a username'),
  displayName: yup.string().required('Please Enter a display name'),
  email: yup.string().email().required('Please Enter your Email'),
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

type RegisterModel = yup.InferType<typeof registerValidation>

const registerRequest = async (formData: UserCreationRequestDTO) => {
  await httpClient.post<UserCreationRequestDTO>('/register', formData)
  return formData.username
}

//---------------------------------------------------------------------------------------------------

function RegisterPage() {
  const method = useForm<RegisterModel>({ resolver: yupResolver(registerValidation) })

  const registerMutation = useMutation(registerRequest, {
    onSuccess: (username) => {
      toast.success('Register successfully')
      router.push(`/register/${username}`)
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<RegisterModel> = async (data) => {
    delete data.confirmPassword
    await registerMutation.mutate(data)
  }

  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
    >
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <Typography>Username</Typography>
          <RegisteredTextfield
            type={''}
            name="username"
            label="Username"
            errors={method.formState.errors.username}
          />

          <Typography>Display name</Typography>
          <RegisteredTextfield
            type={''}
            label="Display name"
            name="displayName"
            errors={method.formState.errors.displayName}
          />

          <Typography>Email</Typography>
          <RegisteredTextfield
            type={''}
            label="Email"
            name="email"
            errors={method.formState.errors.email}
          />

          <Typography>Password</Typography>
          <RegisteredTextfield
            type="password"
            name="password"
            label="Password"
            errors={method.formState.errors.password}
          />

          <Typography>Confirm Password</Typography>
          <RegisteredTextfield
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            errors={method.formState.errors.confirmPassword}
          />
          <br />
          <br />

          <Button fullWidth size="large" type="submit" color="primary" variant="contained">
            Register
          </Button>
        </form>
      </FormProvider>
    </Stack>
  )
}
export default RegisterPage

RegisterPage.topBarProps = {
  title: 'Register',
  action: TopBarActionType.Back,
}
