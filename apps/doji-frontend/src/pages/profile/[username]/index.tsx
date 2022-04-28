import {
  Button,
  CircularProgress,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiMessageSquare, FiUserPlus } from 'react-icons/fi'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import RatingPanel from '@frontend/components/Review/RatingPanel'
import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'

import { IMeResponseDTO, IProfileResponseDTO, IReportDTO } from '@libs/api'
import { Achievement, CompactProfile, SessionCard } from '@libs/mui'

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
    } catch (error) {}
  }

  const addFriend = async () => {
    // TODO wait for friend system api
    //
    // try {
    //   await toast.promise(httpClient.post('report', { expertUsername: displayUser.username }), {
    //     loading: 'Loading...',
    //     success: 'Report this expert successful.',
    //     error: 'You have already reported this expert',
    //   })
    // } catch (error) {}
  }

  const { data: userData } = useQuery('user', fetchUserInformation, { initialData: user })
  const currentUser = userData

  const router = useRouter()
  const username = router.query.username as string

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
        <Stack spacing={4} direction={'row'}>
          <Button fullWidth onClick={addFriend}>
            <FiUserPlus style={{ marginRight: 8 }} /> Add Friend
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              router.push('/chat')
            }}
          >
            <FiMessageSquare style={{ marginRight: 8 }} /> Message
          </Button>
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

      <Typography color="sky.main" fontWeight={500}>
        Working history and Acheivement
      </Typography>
      {displayUser.workHistory.length === 0 && (
        <Typography color="sky.main" fontWeight={400} align="center" py={4}>
          - This user has no history -
        </Typography>
      )}
      {displayUser.workHistory.map((wh) => (
        <Achievement key={wh.id} title={wh.topic} desc={wh.description} />
      ))}

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
