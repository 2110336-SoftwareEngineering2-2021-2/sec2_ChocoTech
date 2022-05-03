import { Avatar, Button, Stack, Typography } from '@mui/material'
import StatusBadge from 'libs/mui/src/lib/StatusBadge'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiUserPlus } from 'react-icons/fi'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IMinimalFriend } from '@libs/api'
import { SearchBar } from '@libs/mui'

const FriendPage: ExtendedNextPage = () => {
  const { data: Friends, isLoading } = useQuery('/friend', async () => {
    return await httpClient.get<IMinimalFriend[]>('/friend').then((res) => res.data)
  })

  const router = useRouter()

  const handleFriendClick = (id: string) => {
    router.push(`/profile/${id}`)
  }

  return (
    <Stack mb={5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="title3" py={2} color="ink.dark">
          My Friends
        </Typography>
        <Link href="/friend/find" passHref>
          <Button size="small">
            <FiUserPlus style={{ marginRight: 8 }} /> Add
          </Button>
        </Link>
      </Stack>
      <SearchBar />
      <Stack p={2}>
        {Friends
          ? Friends.map((elem) => (
              <div key={elem.username} onClick={() => handleFriendClick(elem.username)}>
                <Stack direction="row" spacing={2} p={1}>
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

export default FriendPage

export const getServerSideProps = getServerSideUser()
