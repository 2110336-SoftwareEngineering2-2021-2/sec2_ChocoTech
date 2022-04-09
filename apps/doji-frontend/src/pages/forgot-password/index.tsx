import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import * as yup from 'yup'

import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordModel>({
    resolver: yupResolver(ForgotPasswordSchema),
  })

  const onSubmit = async (formData: ForgotPasswordModel) => {
    try {
      toast.promise(forgotPasswordRequest(formData), {
        loading: 'loading',
        success: 'password reset email has been sent to the address provided',
        error: '',
      })
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
          label="Your email address"
          errors={errors.email}
          {...register('email')}
        />
        <Button fullWidth size="large" type="submit" color="primary" variant="contained">
          send reset link
        </Button>
      </form>
    </Stack>
  )
}

export default ForgotPasswordPage
