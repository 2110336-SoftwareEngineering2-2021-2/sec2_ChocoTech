import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField, Typography } from '@mui/material'
import { type } from 'os'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import { httpClient } from '@frontend/services'

import { ICreateSessionRequestDTO } from '@libs/api'

const CreateSessionResolver = yup.object({
  topic: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  fee: yup.number().typeError('This field must be a number').required('This field is required'),
})

type CreateSessionModel = yup.InferType<typeof CreateSessionResolver>

export function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateSessionModel>({
    resolver: yupResolver(CreateSessionResolver),
  })

  async function onSubmit(data) {
    const parsedData = data as ICreateSessionRequestDTO
    console.log(parsedData)
    try {
      await toast.promise(httpClient.post('/session', parsedData), {
        loading: 'Loading',
        success: 'Successfully add session',
        error: 'Fail to add session',
      })
    } catch (e) {
      console.log('fail to add session')
    }
  }

  return (
    <div>
      <br />
      <Typography variant="h4" fontWeight={700}>
        Add Session
      </Typography>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('topic')}
          fullWidth
          name="topic"
          placeholder="Title"
          error={!!errors.topic}
          helperText={errors.topic?.message}
        ></TextField>
        <br />
        <br />
        <TextField
          {...register('description')}
          fullWidth
          name="description"
          placeholder="Description"
          error={!!errors.description}
          helperText={errors.description?.message}
        ></TextField>
        <br />
        <br />
        <TextField
          {...register('fee')}
          fullWidth
          name="fee"
          placeholder="fee (/hr/person)"
          error={!!errors.fee}
          helperText={errors.fee?.message}
        ></TextField>
        <br />
        <br />
        <Button fullWidth type="submit">
          Add
        </Button>
      </form>
    </div>
  )
}
export default Index
