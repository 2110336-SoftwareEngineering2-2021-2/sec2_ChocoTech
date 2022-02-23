import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginResponseDTO } from '@libs/api'
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

const loginRequest = async (loginData: LoginModel): Promise<LoginResponseDTO> => {
  const { data } = await httpClient.post<LoginResponseDTO>('/auth/password', loginData)
  return data
}

const LoginPage: ExtendedNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
  })

  const { setUser } = useAuthStore()

  const loginMutation = useMutation(loginRequest, {
    onSuccess: ({ token, user }) => {
      const localStorage = new Storage('localStorage')
      localStorage.set<string>(StorageKey.TOKEN, token)
      setUser(user)
    },
  })

  const onSubmit = async (formData: LoginModel) => {
    try {
      toast.promise(loginMutation.mutateAsync(formData), {
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

export default LoginPage

LoginPage.topBarProps = {
  title: 'Log in',
  action: TopBarActionType.Back,
} as TopBarProps
