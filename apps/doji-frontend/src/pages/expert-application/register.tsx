import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { SimpleDialogProps } from '@frontend/pages/expert-application'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserCreationRequestDTO } from '@libs/api'
import { TopBarActionType } from '@libs/mui'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCheck2 } from 'react-icons/bs'
import { useMutation } from 'react-query'

const registerValidation = yup.object({
  contentField: yup.string().required('Please enter a content field'),
  applicationContent: yup.string().required('Please enter an application content'),
})

type RegisterModel = yup.InferType<typeof registerValidation>

const registerRequest = async (formData: UserCreationRequestDTO) => {
  await httpClient.post<UserCreationRequestDTO>('/register', formData)
  return formData.username
}

//---------------------------------------------------------------------------------------------------

function RegisterPage() {
  //---------------------------------------------------------------------------------------------------
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  //---------------------------------------------------------------------------------------------------
  const method = useForm<RegisterModel>({ resolver: yupResolver(registerValidation) })

  const registerMutation = useMutation(registerRequest, {
    onSuccess: () => {
      handleClickOpen()
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<RegisterModel> = async (data) => {
    //await registerMutation.mutate(data)
    axios
      .post('http://localhost:3333/api/', data)
      .then(function (response) {})
      .catch(function (error) {
        if (error.response.status === 422) {
          alert('User with this username or email already exist.')
        }
      })
  }

  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
    >
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <RegisteredTextfield
            type={''}
            name="contentField"
            label="Content Field"
            errors={method.formState.errors.contentField}
          />
          <RegisteredTextfield
            type={''}
            name="applicationContent"
            label="Application Content"
            errors={method.formState.errors.applicationContent}
          />
          <Button fullWidth type="submit" variant="contained" onClick={handleClickOpen}>
            Apply for an expert
          </Button>
        </form>
      </FormProvider>
      <SimpleDialog open={open} onClose={handleClose} />
    </Stack>
  )
}
export default RegisterPage

RegisterPage.topBarProps = {
  title: 'Apply for an expert',
  action: TopBarActionType.Back,
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose('')
    router.replace('/expert-application')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack margin={2.5}>
        <Stack margin={3} alignItems="center">
          <BsCheck2 size={42} />
        </Stack>
        <Typography fontWeight={700} variant="title3" align="center">
          Request has been sent
        </Typography>
        <br />
        <Typography fontWeight={400} variant="regular" align="center" marginBottom={1.5}>
          please wait for admin to approve this request
        </Typography>
      </Stack>
    </Dialog>
  )
}
