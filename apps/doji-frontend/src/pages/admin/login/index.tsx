import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { InferType, object, string } from 'yup'

import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { useAdminAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'

const LoginSchema = object({
  username: string().trim().required('Please enter the username'),
  password: string().trim().required('Please enter the password'),
})

type LoginModel = InferType<typeof LoginSchema>

const adminLoginRequest = (loginData: LoginModel): Promise<void> => {
  const { username, password } = loginData
  if (username === 'admin' && password === 'admin') {
    const localStorage = new Storage('localStorage')
    localStorage.set(StorageKey.ADMIN_TOKEN, 'admin')
    return Promise.resolve()
  } else {
    throw new Error('Invalid username or password')
  }
}

const AdminLoginPage: ExtendedNextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>({
    resolver: yupResolver(LoginSchema),
  })

  const setAdmin = useAdminAuthStore((store) => store.setAdmin)

  const adminLoginMutation = useMutation(adminLoginRequest, {
    onSuccess: () => {
      setAdmin(true)
      router.push('/admin/expert-requests')
    },
  })

  const onSubmit = async (formData: LoginModel) => {
    try {
      toast.promise(adminLoginMutation.mutateAsync(formData), {
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
        mt={10}
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
            Admin Log in
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
        </Stack>

        <Stack direction="column" spacing={2} pb={10}>
          <Button type="submit">Log in</Button>
        </Stack>
      </Stack>
    </>
  )
}

export default AdminLoginPage

AdminLoginPage.dontShowNavBar = true
