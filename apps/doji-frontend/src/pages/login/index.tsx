import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { InferType, object, string } from 'yup'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'

const LoginSchema = object({
  username: string().trim().required('Please enter the username'),
  password: string().trim().required('Please enter the password'),
})

type LoginModel = InferType<typeof LoginSchema>

const loginRequest = async (loginData: LoginModel): Promise<void> => {
  await httpClient.post('/auth/login', loginData)
}

const LoginPage: ExtendedNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
  })

  const setUser = useAuthStore((store) => store.setUser)

  const { refetch: userRefetch } = useQuery('user', fetchUserInformation, {
    retry: false,
    enabled: false,
  })

  const loginMutation = useMutation(loginRequest, {
    onSuccess: async () => {
      const { data } = await userRefetch()
      setUser(data)
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
        spacing={2}
        flexGrow={1}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="title3" fontWeight={500} align="center" lineHeight={4}>
            Log in
          </Typography>
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
          <Button type="submit">Log in</Button>

          <Typography color="ink.lighter" margin={0}>
            <div
              style={{
                width: '100%',
                height: '0px',
                borderBottom: '1px solid #72777A',
                textAlign: 'center',
                margin: '16px 0px',
              }}
            >
              <span
                style={{
                  backgroundColor: '#ffffff',
                  padding: '0 10px',
                  position: 'relative',
                  top: '-11px',
                }}
              >
                or
              </span>
            </div>
          </Typography>

          <Link href="/signup" passHref>
            <Button variant="outlined">Sign up</Button>
          </Link>

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
          {/* <Typography align="center" pt={4}>
            Don’t have an account yet?{' '}
            <Link href="signup" passHref>
              <MuiLink color="primary">Sign up</MuiLink>
            </Link>
          </Typography> */}
        </Stack>
      </Stack>
    </>
  )
}

export default LoginPage
