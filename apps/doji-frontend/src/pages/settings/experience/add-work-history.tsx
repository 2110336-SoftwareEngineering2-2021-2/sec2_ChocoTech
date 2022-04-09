import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import router from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'

import { IMeResponseDTO } from '@libs/api'

interface SettingsPageProps {
  user: IMeResponseDTO
}

type AddWorkHistoryModel = {
  topic: String
  description: String
  expert: String
}

const Index: React.FC<SettingsPageProps> = ({ user }) => {
  const { register, handleSubmit } = useForm<AddWorkHistoryModel>()

  const onSubmit: SubmitHandler<AddWorkHistoryModel> = async (data) => {
    console.log(data)

    await toast.promise(httpClient.post('expert/work/histories', data), {
      loading: 'Loading...',
      success: 'Add new work history.',
      error: 'An error occur',
    })
    router.push('./')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={1}>
        <Typography variant="title3" mt={4}>
          Add Experience
        </Typography>

        <Box width="maxWidth" height={300} bgcolor="sky.light" borderRadius={1} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Title
        </Typography>
        <TextField {...register('topic')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Description
        </Typography>
        <TextField {...register('description')} />

        <Button variant="contained" style={{ marginTop: '24px' }} type="submit">
          Add Experience
        </Button>
      </Stack>
    </form>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
