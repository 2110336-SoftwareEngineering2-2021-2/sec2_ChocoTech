import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { SimpleDialogProps } from '@frontend/pages/my-session'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IExpertRegistrationRequestDTO } from '@libs/api'
import { TopBarActionType } from '@libs/mui'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import * as yup from 'yup'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsCheck2 } from 'react-icons/bs'
import { useMutation } from 'react-query'

const expertApplicationValidation = yup.object({
  field: yup.string().required('Please enter a content field'),
  desc: yup.string().required('Please enter an application content'),
})

type EApplicationModel = yup.InferType<typeof expertApplicationValidation>

const registerRequest = async (formData: IExpertRegistrationRequestDTO) => {
  await httpClient.post<IExpertRegistrationRequestDTO>('/expert/application', formData)
  return
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EApplicationModel>({
    resolver: yupResolver(expertApplicationValidation),
  })
  const registerMutation = useMutation(registerRequest, {
    onSuccess: () => {
      handleClickOpen()
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmit: SubmitHandler<EApplicationModel> = async (data) => {
    console.log(data)
    await registerMutation.mutate(data)
  }
  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      flexGrow={1}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegisteredTextfield label="Content Field" errors={errors.field} {...register('field')} />
        <RegisteredTextfield
          label="Application Content"
          errors={errors.desc}
          {...register('desc')}
        />
        <Button fullWidth type="submit" variant="contained">
          Apply for an expert
        </Button>
      </form>

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
    router.push('/my-session')
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
