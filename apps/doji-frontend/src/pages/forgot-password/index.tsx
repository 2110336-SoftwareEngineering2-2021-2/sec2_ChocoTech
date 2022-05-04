import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'

import { IUserSendResetPasswordEmailRequest } from '@libs/api'

const ForgotPasswordSchema = yup.object({
  email: yup.string().email().required('Please Enter your Email'),
})

type ForgotPasswordModel = yup.InferType<typeof ForgotPasswordSchema>

const forgotPasswordRequest = async (
  forgotPasswordData: IUserSendResetPasswordEmailRequest,
): Promise<void> => {
  await httpClient.post<IUserSendResetPasswordEmailRequest>(
    '/auth/reset-password',
    forgotPasswordData,
  )
}

const ForgotPasswordPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordModel>({
    resolver: yupResolver(ForgotPasswordSchema),
  })

  const onSubmit = async (formData: ForgotPasswordModel) => {
    try {
      await toast.promise(forgotPasswordRequest(formData), {
        loading: 'loading',
        success: 'password reset email has been sent to the address provided',
        error: '',
      })
      router.push('/login')
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
      <Stack onSubmit={handleSubmit(onSubmit)} component="form" gap={2}>
        <Typography variant="title3" align="center" color="ink.dark">
          Send Password Reset Email
        </Typography>
        <RegisteredTextfield
          label="Your email address"
          errors={errors.email}
          {...register('email')}
        />
        <Button fullWidth size="large" type="submit" color="primary" variant="contained">
          send reset link
        </Button>
      </Stack>
    </Stack>
  )
}

export default ForgotPasswordPage
