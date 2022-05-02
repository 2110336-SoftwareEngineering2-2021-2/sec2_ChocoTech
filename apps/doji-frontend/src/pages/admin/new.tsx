import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import * as yup from 'yup'

import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { useAdminAuthGuard } from '@frontend/hooks/admin'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IAdminCreationRequestDTO } from '@libs/api'

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

const NewAdminPage: ExtendedNextPage = () => {
  useAdminAuthGuard()

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
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
      mt={10}
      spacing={2}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Typography variant="large" fontWeight={500} align="center" lineHeight={4}>
            New admin
          </Typography>
          <RegisteredTextfield
            label="Username"
            errors={errors.username}
            {...register('username')}
          />
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
          <Button fullWidth type="submit">
            Create new admin
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
export default NewAdminPage

NewAdminPage.dontShowNavBar = true
