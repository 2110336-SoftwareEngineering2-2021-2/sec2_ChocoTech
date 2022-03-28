import { getServerSideUser } from '@frontend/common/auth'
import { IMeResponseDTO } from '@libs/api'
import { CompactPrpfile, CountrySelect } from '@libs/mui'
import { Button, Stack, TextField, Typography } from '@mui/material'

import { useMemo } from 'react'

interface SettingsPageProps {
  user: IMeResponseDTO
}

const Index: React.FC<SettingsPageProps> = ({ user }) => {
  const displayName = useMemo(() => {
    if (user.displayName) return user.displayName
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`
    return user.username
  }, [user])
  const firstName = useMemo(() => {
    return user.firstName
  }, [user])
  const lastName = useMemo(() => {
    return user.lastName
  }, [user])
  const profilePictureURL = useMemo(() => {
    return user.profilePictureURL
  }, [user])

  const setFirstName = (f) => {
    user.firstName = f
    console.log(user.firstName)
  }

  const setLastName = (l) => {
    user.lastName = l
    console.log(user.lastName)
  }

  const setProfilePictureURL = (url) => {
    user.profilePictureURL = url
    console.log(user.profilePictureURL)
  }

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="title3" mt={4}>
        Edit profile
      </Typography>
      <CompactPrpfile
        username={user.username}
        displayName={displayName}
        profileUrl={profilePictureURL}
        editable
        onUpload={(e) => {
          console.log(e.target.value)
          setProfilePictureURL(e.target.value)
        }}
      />

      <Typography variant="regular" fontWeight={500} pt={1}>
        Username
      </Typography>
      <TextField variant="filled" disabled value={user.username} />

      <Typography variant="regular" fontWeight={500} pt={1}>
        Email
      </Typography>
      <TextField variant="filled" disabled value={user.email} />

      <Typography variant="regular" fontWeight={500} pt={1}>
        Display name
      </Typography>
      <TextField
        defaultValue={displayName}
        onChange={(e) => {
          console.log(e.target.value)
        }}
      />

      <Typography variant="regular" fontWeight={500} pt={1}>
        First name
      </Typography>
      <TextField
        defaultValue={firstName}
        onChange={(e) => {
          setFirstName(e.target.value)
        }}
      />

      <Typography variant="regular" fontWeight={500} pt={1}>
        Last name
      </Typography>
      <TextField
        defaultValue={lastName}
        onChange={(e) => {
          setLastName(e.target.value)
        }}
      />

      <Typography variant="regular" fontWeight={500} pt={1}>
        Location
      </Typography>
      <CountrySelect
        // textFieldProps={{ value: user.location }}
        // value={user.location}
        onChange={(e) => {
          console.log(e)
        }}
      />

      <Button
        variant="contained"
        style={{ marginTop: '24px' }}
        // onSubmit={() => {
        //   submitNewProfile()
        // }}
      >
        Update Profile
      </Button>
    </Stack>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
