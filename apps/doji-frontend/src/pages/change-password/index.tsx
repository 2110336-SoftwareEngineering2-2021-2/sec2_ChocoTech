import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { InferType, object, ref, string } from 'yup'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IUserChangePasswordRequestDTO } from '@libs/api'

const ChangePasswordSchema = object({
  oldPassword: string().trim().required('Please enter the password'),
  newPassword: string()
    .trim()
    .required('Please enter the password')
    .matches(/^.{8,16}$/, 'Password should have 8-16 letters'),
  confirmPassword: string()
    .trim()
    .oneOf([ref('newPassword')], 'Incorrect confirm password'),
})
export type ChangePasswordModel = InferType<typeof ChangePasswordSchema>

const changePasswordRequest = async (formData: IUserChangePasswordRequestDTO) => {
  await httpClient.post<unknown, unknown, IUserChangePasswordRequestDTO>(
    '/auth/change-password',
    formData,
  )
}

const ChangePasswordPage: ExtendedNextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordModel>({
    resolver: yupResolver(ChangePasswordSchema),
  })

  const changePasswordMutation = useMutation(changePasswordRequest, {
    onSuccess: () => {
      toast.success('Password changed successfully')
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<ChangePasswordModel> = async (data) => {
    await changePasswordMutation.mutateAsync({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
    router.push('/settings')
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2} m={3}>
      <TextField
        {...register('oldPassword')}
        type="password"
        label="Current password..."
        error={!!errors.oldPassword}
        helperText={errors.oldPassword?.message}
      ></TextField>
      <TextField
        {...register('newPassword')}
        type="password"
        label="New password..."
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <TextField
        {...register('confirmPassword')}
        type="password"
        label="Confirm new password..."
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      ></TextField>
      <Button type="submit" sx={{ p: 2 }}>
        Change password
      </Button>
    </Stack>
  )
}

export default ChangePasswordPage

export const getServerSideProps = getServerSideUser()
