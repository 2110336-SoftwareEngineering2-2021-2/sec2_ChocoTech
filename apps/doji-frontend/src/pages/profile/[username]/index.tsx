import { getRegisteredStyles } from '@emotion/react/node_modules/@emotion/utils'
import {
  Button,
  CircularProgress,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiCheck, FiMessageSquare, FiUserPlus } from 'react-icons/fi'
import { useMutation, useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import RatingPanel from '@frontend/components/Review/RatingPanel'
import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'

import { IMeResponseDTO, IProfileResponseDTO, IUsernameDTO } from '@libs/api'
import { Achievement, CompactProfile, SessionCard } from '@libs/mui'

const NoWorkHistory = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
`

interface ProfilePageProps {
  user: IMeResponseDTO
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const submitReport = async () => {
    try {
      await toast.promise(httpClient.post('report', { expertUsername: displayUser.username }), {
        loading: 'Loading...',
        success: 'Report this expert successful.',
        error: 'You have already reported this expert',
      })
    } catch (error) {
      console.log(error)
    }
  }

  const router = useRouter()
  const username = router.query.username as string
  const { data: relation, refetch: refetchRelation } = useQuery(
    ['/friend/rel/', username],
    async () => {
      return await httpClient.get<string>(`/friend/rel/${username}`).then((res) => res.data)
    },
    {
      enabled: !!username,
    },
  )

  const addFriendMutation = useMutation<void, AxiosError, IUsernameDTO>(async (data) => {
    return await httpClient.post(`friend/friendship`, { username: data.username })
  })

  const addFriend = async (username: string) => {
    try {
      await toast.promise(addFriendMutation.mutateAsync({ username: username }), {
        loading: 'Loading...',
        success: 'Added friend successfully',
        error: 'Error',
      })
      await refetchRelation()
    } catch (error) {
      console.log(error)
    }
  }

  const { data: userData } = useQuery('user', fetchUserInformation, { initialData: user })
  const currentUser = userData

  const { data, isError, isLoading, error } = useQuery<IProfileResponseDTO>(
    ['/profile', username],
    () => httpClient.get(`/profile/${username}`).then((res) => res.data),
  )

  const displayUser = data

  if (isError) return <p>{`Error: ${error}`}</p>

  if (isLoading) return <CircularProgress />

  return (
    <Stack spacing={1}>
      <CompactProfile
        username={displayUser.username}
        displayName={displayUser.displayName}
        profileUrl={displayUser.profilePictureURL}
      />
      {currentUser.username !== displayUser.username && (
        <Stack spacing={3} direction={'row'}>
          {relation == 'friend' ? (
            <Button fullWidth disabled variant="outlined" startIcon={<FiCheck />}>
              Friend
            </Button>
          ) : (
            <Button fullWidth onClick={() => addFriend(username)} startIcon={<FiUserPlus />}>
              Add Friend
            </Button>
          )}

          <Link href="/chat" passHref>
            <Button fullWidth variant="outlined">
              <FiMessageSquare style={{ marginRight: 8 }} /> Message
            </Button>
          </Link>
          {displayUser.role === 'expert' && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <BsThreeDotsVertical />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 91,
                }}
              >
                <MenuItem>
                  <ListItemText onClick={submitReport}>Report this expert</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      )}
      <Stack spacing={2} pt={4}>
        <Typography color="sky.main" fontWeight={500}>
          Working history and Acheivement
        </Typography>
        {displayUser.workHistory.length === 0 && (
          <NoWorkHistory>
            <Typography color="sky.main" fontWeight={400} align="center" py={4}>
              - This user has no history -
            </Typography>
          </NoWorkHistory>
        )}
        {displayUser.workHistory.map((wh) => (
          <Achievement key={wh.id} title={wh.topic} desc={wh.description} />
        ))}
      </Stack>
      {displayUser.role === 'expert' && (
        <>
          <Typography color="sky.main" fontWeight={500}>
            Rating and review
          </Typography>
          <RatingPanel reviewStat={displayUser.rating} />
        </>
      )}
      {displayUser.role === 'expert' && (
        <>
          <Typography color="sky.main" fontWeight={500}>
            Recent Session
          </Typography>
          <Stack mt={2} spacing={2}>
            {displayUser.sessions.length === 0 && (
              <Typography color="sky.main" fontWeight={400} align="center" py={4}>
                - This expert has no sesion -
              </Typography>
            )}
            {displayUser.sessions.map((session) => (
              <>
                <SessionCard
                  key={session.id}
                  owner={{ username: displayUser.username } as any}
                  // {...session}
                  id={session.id}
                  fee={session.fee}
                  topic={session.topic}
                  description={session.description}
                  reviews={session.reviews}
                  onClick={() => router.push(`/session/${session.id}`)}
                />
              </>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default ProfilePage

export const getServerSideProps = getServerSideUser()
