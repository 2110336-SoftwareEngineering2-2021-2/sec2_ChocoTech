import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUserChangePasswordRequestDTO } from '@libs/api'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { InferType, object, ref, string } from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

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
    await changePasswordMutation.mutate({
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
  }

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2}>
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
      <Button type="submit" variant="contained" sx={{ p: 2 }}>
        <Typography variant="large" fontWeight="400">
          Change password
        </Typography>
      </Button>
    </Stack>
  )
}

export default ChangePasswordPage

export const getServerSideProps = getServerSideUser
