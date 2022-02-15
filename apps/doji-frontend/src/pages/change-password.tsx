import TopNav from '@frontend/components/NavigationBar/TopNav'
import Navbar from '@frontend/components/navbar'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Container, TextField, Typography } from '@mui/material'
import { InferType, object, ref, string } from 'yup'

import React, { useEffect } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

const changePasswordSchema = object({
  oldPassword: string().trim().required('Please enter the password'),
  newPassword: string()
    .trim()
    .required('Please enter the password')
    .matches(/^.{8,16}$/, 'Password should have 8-16 letters'),
  passwordConfirmation: string()
    .trim()
    .oneOf([ref('newPassword')], 'Incorrect password confirmation'),
})
export type ChangePasswordModel = InferType<typeof changePasswordSchema>

export function ChangePassword() {
  const { register, control, handleSubmit } = useForm<ChangePasswordModel>({
    resolver: yupResolver(changePasswordSchema),
  })
  const onSubmit: SubmitHandler<ChangePasswordModel> = (data) => {
    //assume that the old password is 12345
    if (data.oldPassword !== '12345') {
      toast.error('Current password is incorrect!')
    } else {
      toast.success('Password has been changed')
    }
  }
  const onError: SubmitErrorHandler<ChangePasswordModel> = (data) => {
    console.log(data)
    if (data.newPassword) toast.error(data.newPassword.message)
    if (data.passwordConfirmation) toast.error(data.passwordConfirmation.message)
  }
  return (
    <div>
      <Navbar href="/" action="back" title="Change password"></Navbar>
      <Container maxWidth="sm">
        <Typography variant="small" fontWeight={400}>
          {' '}
          Choose a secure password{' '}
        </Typography>
        <Container sx={{ mt: 3 }} fixed>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextField
              {...register('oldPassword')}
              type="password"
              sx={{ width: '100%', mb: 2 }}
              label="Current password..."
            ></TextField>
            <TextField
              {...register('newPassword')}
              type="password"
              sx={{ width: '100%', mb: 2 }}
              label="New password..."
            ></TextField>
            <TextField
              {...register('passwordConfirmation')}
              type="password"
              sx={{ width: '100%', mb: 3 }}
              label="Confirm new password..."
            ></TextField>
            <Button type="submit" size="medium" variant="contained" sx={{ p: 2, width: '100%' }}>
              <Typography variant="large" fontWeight="400">
                Change password
              </Typography>
            </Button>
          </form>
        </Container>
      </Container>
    </div>
  )
}

export default ChangePassword
