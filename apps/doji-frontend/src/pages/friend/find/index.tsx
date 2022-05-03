import { Avatar, Button, Stack, Typography } from '@mui/material'
import { display } from '@mui/system'
import { AxiosError } from 'axios'
import StatusBadge from 'libs/mui/src/lib/StatusBadge'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { FiUserPlus } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'

import { IMinimalFriend, IUser, IUsernameDTO } from '@libs/api'
import { SearchBar } from '@libs/mui'

const FindFriendPage: ExtendedNextPage = () => {
  const currentUser = useAuthStore((state) => state.user)

  const { data: users, refetch } = useQuery('/friend/notfriend', async () => {
    return await httpClient.get<IMinimalFriend[]>('/friend/notfriend').then((res) => res.data)
  })

  const router = useRouter()

  const addFriendMutation = useMutation<void, AxiosError, IUsernameDTO>(async (data) => {
    return await httpClient.post(`friend/friendship`, { username: data.username })
  })
  const handleAddFriend = async (username: string) => {
    // TODO wait for friend system api
    //
    try {
      await toast.promise(addFriendMutation.mutateAsync({ username: username }), {
        loading: 'Loading...',
        success: 'Added friend successfully',
        error: 'Error',
      })
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }
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
              <div key={elem.username}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" spacing={2} p={1}>
                    <StatusBadge username={elem.username}>
                      <Avatar
                        src={elem.profilePictureURL}
                        sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}
                        onClick={() => handleUserClick(elem.username)}
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
                  <Button size="small" onClick={() => handleAddFriend(elem.username)}>
                    <FiUserPlus style={{ marginRight: 8 }} /> Add
                  </Button>
                </Stack>
              </div>
            ))
          : null}
      </Stack>
    </Stack>
  )
}

export default FindFriendPage

export const getServerSideProps = getServerSideUser()
