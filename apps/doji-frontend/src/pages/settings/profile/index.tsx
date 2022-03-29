import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'
import { IMeResponseDTO, IUserEditProfileRequestDTO } from '@libs/api'
import { CompactPrpfile, CountrySelect } from '@libs/mui'
import { Button, Stack, TextField, Typography } from '@mui/material'

import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'

interface SettingsPageProps {
  user: IMeResponseDTO
}

type UpdateProfileModel = {
  username: String
  email: String
  displayName: String
  firstName: String
  lastName: String
  location: String
}

const Index: React.FC<SettingsPageProps> = ({ user }) => {
  const { data: userData } = useQuery('user', fetchUserInformation, { initialData: user })

  const { register, handleSubmit } = useForm<UpdateProfileModel>({
    defaultValues: {
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
    },
  })

  const onSubmit: SubmitHandler<UpdateProfileModel> = async (data) => {
    delete data.email
    delete data.username

    await toast.promise(httpClient.put('profile/edit', data), {
      loading: 'Loading...',
      success: 'Update your profile successful.',
      error: 'An error occur',
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={1}>
        <Typography variant="title3" mt={4}>
          Edit profile
        </Typography>

        <CompactPrpfile
          username={user.username}
          displayName={user.displayName}
          // profileUrl={profilePictureURL}
          editable
          // onUpload={(e) => {
          //   console.log(e.target.value)
          //   // setProfilePictureURL(e.target.value)
          // }}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Username
        </Typography>
        <TextField
          variant="filled"
          disabled
          defaultValue={user.username ?? ''}
          {...register('username')}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Email
        </Typography>
        <TextField
          variant="filled"
          disabled
          defaultValue={user.email ?? ''}
          {...register('email')}
        />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Display name
        </Typography>
        <TextField defaultValue={user.displayName ?? ''} {...register('displayName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          First name
        </Typography>
        <TextField defaultValue={user.firstName ?? ''} {...register('firstName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Last name
        </Typography>
        <TextField defaultValue={user.lastName ?? ''} {...register('lastName')} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Location
        </Typography>
        <CountrySelect
          // textFieldProps={{ value: user.location }}
          // value={user.location}
          // onChange={(e) => {
          //   console.log(e)
          // }}
          // onSelect={(e) => {
          //   // console.log(e.target.value)
          // }}
          defaultValue={user.location ?? ''}
          {...register('location')}
        />

        <Button variant="contained" style={{ marginTop: '24px' }} type="submit">
          Update Profile
        </Button>
      </Stack>
    </form>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
