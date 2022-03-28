import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUserRegistrationRequestDTO } from '@libs/api'
import { Button, Stack } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const registerValidation = yup.object({
  username: yup.string().required('Please Enter a username'),
  displayName: yup.string().required('Please Enter a display name'),
  email: yup.string().email().required('Please Enter your Email'),
  password: yup
    .string()
    .required('Please Enter your password')
    .min(8, 'Must have at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please Enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

type RegisterModel = yup.InferType<typeof registerValidation>

const signupRequest = async (formData: IUserRegistrationRequestDTO) => {
  await httpClient.post<IUserRegistrationRequestDTO>('/auth/signup', formData)
  return formData.username
}

//---------------------------------------------------------------------------------------------------

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterModel>({
    resolver: yupResolver(registerValidation),
  })

  const registerMutation = useMutation(signupRequest, {
    onSuccess: (username) => {
      toast.success('Signup successfully')
      router.push(`/signup/${username}`)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisteredTextfield label="Username" errors={errors.username} {...register('username')} />
        <RegisteredTextfield
          label="Display name"
          errors={errors.displayName}
          {...register('displayName')}
        />
        <RegisteredTextfield label="Email" errors={errors.email} {...register('email')} />
        <RegisteredTextfield
          type="password"
          label="Password"
          errors={errors.password}
          {...register('password')}
        />
        <RegisteredTextfield
          type="password"
          label="Confirm Password"
          errors={errors.confirmPassword}
          {...register('confirmPassword')}
        />
        <Button fullWidth size="large" type="submit" color="primary" variant="contained">
          Register
        </Button>
      </form>
    </Stack>
  )
}
export default RegisterPage
