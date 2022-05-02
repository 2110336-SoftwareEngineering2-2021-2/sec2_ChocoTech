import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import router, { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import * as yup from 'yup'

import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IUserResetPasswordRequest } from '@libs/api'

const ResetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('enter new password')
    .min(8, 'Must have at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('confirm new password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
})

type ResetPasswordModel = yup.InferType<typeof ResetPasswordSchema>

const ResetPassword: ExtendedNextPage = () => {
  const router = useRouter()
  const token = router.query.token

  const resetPasswordRequest = async (formData: IUserResetPasswordRequest): Promise<void> => {
    await httpClient.post<IUserResetPasswordRequest>('/auth/reset-password/' + token, formData)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordModel>({
    resolver: yupResolver(ResetPasswordSchema),
  })

  const resetPasswordMutation = useMutation(resetPasswordRequest, {
    onSuccess: () => {
      toast.success('Reset Password Success')
      router.push('auth/reset-password/success')
    },
    onError: () => {
      toast.error('Reset Password Failed')
    },
  })

  const onSubmit: SubmitHandler<ResetPasswordModel> = async (formData) => {
    delete formData.confirmPassword
    resetPasswordMutation.mutate(formData)
  }

  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
    >
      <Stack onSubmit={handleSubmit(onSubmit)} component="form" gap={1}>
        <Typography variant="title3" align="center" color="ink.dark">
          Reset Password
        </Typography>
        <div>
          <RegisteredTextfield
            type="password"
            label="enter new password"
            errors={errors.newPassword}
            {...register('newPassword')}
          />
          <RegisteredTextfield
            type="password"
            label="confirm new password"
            errors={errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </div>
        <Button fullWidth size="large" type="submit" color="primary" variant="contained">
          reset password
        </Button>
      </Stack>
    </Stack>
  )
}

export default ResetPassword
