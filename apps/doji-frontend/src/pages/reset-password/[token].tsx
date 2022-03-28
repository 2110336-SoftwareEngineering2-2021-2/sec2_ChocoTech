import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IUserResetPasswordRequest } from '@libs/api'
import { Button, Stack } from '@mui/material'
import router, { useRouter } from 'next/router'
import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

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

const ResetPassword = () => {
  const router = useRouter()
  const token = router.query.token

  const resetPasswordRequest = async (formData: IUserResetPasswordRequest): Promise<void> => {
    await httpClient.post<IUserResetPasswordRequest>('/auth/reset-password/' + token)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordModel>({
    resolver: yupResolver(ResetPasswordSchema),
  })

  const onSubmit: SubmitHandler<ResetPasswordModel> = async (formData) => {
    delete formData.confirmPassword
    try {
      resetPasswordRequest(formData)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button fullWidth size="large" type="submit" color="primary" variant="contained">
          reset password
        </Button>
      </form>
    </Stack>
  )
}

export default ResetPassword
