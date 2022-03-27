import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, TextField, Typography } from '@mui/material'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const ForgotPasswordSchema = yup.object({
  email: yup.string().email().required('Please Enter your Email'),
})

type ForgotPasswordModel = yup.InferType<typeof ForgotPasswordSchema>

const forgotPasswordRequest = async (forgotPasswordData: ForgotPasswordModel): Promise<void> => {
  await httpClient.post<ForgotPasswordModel>('/auth/reset-password', forgotPasswordData)
}

const ForgotPasswordPage: ExtendedNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordModel>({
    resolver: yupResolver(ForgotPasswordSchema),
  })

  const forgotPasswordMutation = useMutation(forgotPasswordRequest, {
    onSuccess: () => {
      //do something
    },
  })

  const onSubmit = async (formData: ForgotPasswordModel) => {
    try {
      toast.promise(forgotPasswordMutation.mutateAsync(formData), {
        loading: 'Loading',
        success: 'The link for password reset has been sent to the provided email address.',
        error: 'Error',
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
