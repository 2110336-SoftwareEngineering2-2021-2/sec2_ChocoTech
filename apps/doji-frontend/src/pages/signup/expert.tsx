import NotiDialog from '@frontend/components/NotiDialog/NotiDialog'
import RegisteredTextfield from '@frontend/components/Register/registerTextfield'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IExpertRegistrationRequestDTO } from '@libs/api'
import { Button, Stack } from '@mui/material'
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

function RegisterPage() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    router.push('/my-session')
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EApplicationModel>({
    resolver: yupResolver(expertApplicationValidation),
  })
  const registerMutation = useMutation(registerRequest, {
    onSuccess: () => {
      toast.dismiss()
      handleClickOpen()
    },
    onError: (error: AxiosError) => {
      toast.dismiss()
      toast.error(error.response.data.message)
    },
    onMutate: () => {
      toast.loading('loading...')
    },
  })

  const onSubmit: SubmitHandler<EApplicationModel> = async (data) => {
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
      <NotiDialog
        open={open}
        onClose={handleClose}
        labelheader="Request has been sent"
        labelinfo="please wait for admin to approve this request"
        icon={<BsCheck2 size={42} />}
      />
    </Stack>
  )
}
export default RegisterPage
