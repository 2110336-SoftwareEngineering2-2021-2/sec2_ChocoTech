import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { TopBarActionType, TopBarProps } from '@libs/mui'
import { Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { InferType, object, string } from 'yup'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

const LoginSchema = object({
  username: string().trim().required('Please enter the username'),
  password: string().trim().required('Please enter the password'),
})

type LoginModel = InferType<typeof LoginSchema>

const loginRequest = async (loginData: LoginModel): Promise<{ token: string }> => {
  const { data } = await httpClient.post<{ token: string }>('/auth/password', loginData)
  return data
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
  })
  const loginQuery = useMutation(loginRequest, {
    onSuccess: ({ token }) => {
      const localStorage = new Storage('localStorage')
      localStorage.set<string>(StorageKey.TOKEN, token)
    },
  })

  const onSubmit = async (formData: LoginModel) => {
    try {
      toast.promise(loginQuery.mutateAsync(formData), {
        loading: 'Loading',
        success: 'Login success',
        error: 'Login failed, please try again',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Stack
        component="form"
        direction="column"
        justifyContent="space-between"
        mt={2}
        spacing={2}
        flexGrow={1}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <TextField
            fullWidth
            label="username"
            {...register('username')}
            error={!!errors?.username}
            helperText={errors?.username?.message ?? ''}
          />
          <TextField
            fullWidth
            label="password"
            type="password"
            {...register('password')}
            error={!!errors?.password}
            helperText={errors?.password?.message ?? ''}
          />
          <Link href="/forgot-password" passHref>
            <MuiLink variant="regular" color="primary" align="left">
              Forgot password?
            </MuiLink>
          </Link>
        </Stack>
        <Stack direction="column" spacing={2} pb={10}>
          <Typography variant="tiny" lineHeight={1.2}>
            By continuing, you agree to our{' '}
            <Link href="terms-of-service" passHref>
              <MuiLink variant="tiny" color="primary">
                Terms of Service{' '}
              </MuiLink>
            </Link>
            and{' '}
            <Link href="privacy-policy" passHref>
              <MuiLink variant="tiny" color="primary">
                Privacy Policy
              </MuiLink>
            </Link>
            .
          </Typography>

          <Button type="submit">Log in</Button>
        </Stack>
      </Stack>
    </>
  )
}

LoginPage.topBarProps = {
  title: 'Log in',
  action: TopBarActionType.Back,
} as TopBarProps
