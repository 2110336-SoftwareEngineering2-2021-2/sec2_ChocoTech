import { Avatar, Stack, Typography } from '@mui/material'
import StatusBadge from 'libs/mui/src/lib/StatusBadge'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IMinimalFriend, IUser } from '@libs/api'
import { SearchBar } from '@libs/mui'

const Index: ExtendedNextPage = () => {
  const getCurrentUsername = async () => {
    return await httpClient.get<IUser>('/auth/me').then((res) => res.data.username)
  }
  const getRelationship = async (username: string) => {
    return await httpClient.get<string>('friend/' + username).then((res) => res.data)
  }

  const { data: users, isLoading } = useQuery('auth/users', async () => {
    return await await httpClient.get<IUser[]>('auth/users').then((res) => res.data) //.filter(async (user) => user.username != (await getCurrentUsername()))
    //.filter(async (user) => (await getRelationship(user.username)) !== 'friend')
  })

  const router = useRouter()

  const handleUserClick = (id: string) => {
    router.push(`/profile/${id}`)
  }

  return (
    <Stack>
      <Typography variant="title3" py={2} color="ink.dark">
        Add Friends
      </Typography>
      <SearchBar />
      <Stack p={2}>
        {users
          ? users.map((elem) => (
              <div key={elem.username} onClick={() => handleUserClick(elem.username)}>
                <Stack direction="row" spacing={2}>
                  <StatusBadge username={elem.username}>
                    <Avatar
                      src={elem.profilePictureURL}
                      sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
                    >
                      {elem.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </StatusBadge>
                  <Stack spacing={1} justifyContent="center">
                    <Typography variant="regular">{elem.displayName}</Typography>
                    <Typography variant="tiny" color="sky.dark">
                      {elem.username}
                    </Typography>
                  </Stack>
                </Stack>
              </div>
            ))
          : null}
      </Stack>
    </Stack>
  )
}

export default Index
