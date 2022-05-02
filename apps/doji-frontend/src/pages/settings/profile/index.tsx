import { Button, Stack, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'
import { useAuthStore } from '@frontend/stores'

import { IMeResponseDTO, IUserEditProfileRequestDTO, IUserEditProfileResponseDTO } from '@libs/api'
import { CompactProfile, CountrySelect } from '@libs/mui'

interface SettingsPageProps {
  user: IMeResponseDTO
}

type UpdateProfileModel = {
  username: string
  email: string
  displayName: string
  firstName: string
  lastName: string
  location: string
}

const Index: React.FC<SettingsPageProps> = ({ user: initialUser }) => {
  const setUser = useAuthStore((store) => store.setUser)
  const user = useAuthStore((store) => store.user)
  const { refetch } = useQuery('user', fetchUserInformation, {
    initialData: initialUser,
    onSuccess: (user) => {
      setUser(user)
    },
  })

  const { register, handleSubmit } = useForm<UpdateProfileModel>({
    defaultValues: {
      username: initialUser.username,
      email: initialUser.email,
      displayName: initialUser.displayName,
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      location: initialUser.location,
    },
  })
  const uploadFile = async (file: File): Promise<string> => {
    const toastId = toast.loading('Loading...')
    try {
      const form = new FormData()
      form.append('file', file)

      const { data } = await httpClient.patch<IUserEditProfileResponseDTO>('/profile/edit', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      refetch()
      toast.dismiss(toastId)
      return data.profilePictureURL
    } catch (err) {
      toast.dismiss(toastId)
      toast.error('An error occur')
    }
  }

  const onSubmit: SubmitHandler<UpdateProfileModel> = async (data) => {
    delete data.email
    delete data.username
    const form = new FormData()
    form.append('displayName', data.displayName)
    form.append('firstName', data.firstName)
    form.append('lastName', data.lastName)
    form.append('location', data.location)

    await toast.promise(
      httpClient.patch('profile/edit', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        loading: 'Loading...',
        success: 'Update your profile successful.',
        error: 'An error occur',
      },
    )
    refetch()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={1}>
        <Typography variant="title3" mt={4}>
          Edit profile
        </Typography>

        <CompactProfile
          username={user?.username}
          displayName={user?.displayName}
          profileUrl={user?.profilePictureURL}
          editable
          onUpload={(e) => {
            uploadFile(e.target.files[0])
          }}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Username
        </Typography>
        <TextField
          variant="filled"
          disabled
          defaultValue={initialUser.username ?? ''}
          {...register('username')}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Email
        </Typography>
        <TextField
          variant="filled"
          disabled
          defaultValue={initialUser.email ?? ''}
          {...register('email')}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Display name
        </Typography>
        <TextField defaultValue={initialUser.displayName ?? ''} {...register('displayName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          First name
        </Typography>
        <TextField defaultValue={initialUser.firstName ?? ''} {...register('firstName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Last name
        </Typography>
        <TextField defaultValue={initialUser.lastName ?? ''} {...register('lastName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Location
        </Typography>
        <CountrySelect register={register('location')} />

        <Button variant="contained" style={{ marginTop: '24px' }} type="submit">
          Update Profile
        </Button>
      </Stack>
    </form>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
