import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IAdminCreationRequestDTO } from '@libs/api'
import { Button, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const newAdminValidation = yup.object({
  username: yup.string().required('Please Enter a username'),
  password: yup
    .string()
    .required('Please Enter your password')
    .min(8, 'Must have at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please Enter your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

type NewAdminModel = yup.InferType<typeof newAdminValidation>

const newAdminRequest = async (formData: IAdminCreationRequestDTO) => {
  await httpClient.post<IAdminCreationRequestDTO>('/admin/newAdmin', formData)
}

//---------------------------------------------------------------------------------------------------

function NewAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAdminModel>({
    resolver: yupResolver(newAdminValidation),
  })

  const newAdminMutation = useMutation(newAdminRequest, {
    onSuccess: () => {
      toast.success('Create new admin successfully')
      router.push('/admin')
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<NewAdminModel> = async (data) => {
    delete data.confirmPassword
    await newAdminMutation.mutate(data)
  }

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="large" fontWeight={500}>
          Username
        </Typography>
        <RegisteredTextfield label="Username" errors={errors.username} {...register('username')} />
        <Typography variant="large" fontWeight={500}>
          Password
        </Typography>
        <RegisteredTextfield
          type="password"
          label="Password"
          errors={errors.password}
          {...register('password')}
        />
        <Typography variant="large" fontWeight={500}>
          Confirm Password
        </Typography>
        <RegisteredTextfield
          type="password"
          label="Confirm Password"
          errors={errors.confirmPassword}
          {...register('confirmPassword')}
        />
        <br />
        <br />
        <Button fullWidth type="submit">
          Create new admin
        </Button>
      </form>
    </Stack>
  )
}
export default NewAdminPage
