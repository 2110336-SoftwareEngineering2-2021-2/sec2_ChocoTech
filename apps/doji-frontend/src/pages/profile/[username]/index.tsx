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
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import RatingPanel from '@frontend/components/Review/RatingPanel'
import SessionDetail from '@frontend/components/Session/SessionDetail'
import { httpClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'

import { IMeResponseDTO, IProfileResponseDTO } from '@libs/api'
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

  console.log('me = ', currentUser)
  console.log('show = ', displayUser)

  return (
    <Stack spacing={1}>
      <CompactProfile
        username={displayUser.username}
        displayName={displayUser.displayName}
        profileUrl={displayUser.profilePictureURL}
      />

      {currentUser.username !== displayUser.username && (
        <Stack spacing={4} direction={'row'}>
          <Button fullWidth>Friend</Button>
          <Button fullWidth variant="outlined">
            Message
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
                  <ListItemText>Report this expert</ListItemText>
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
                  owner={{ username: 'ss' } as any}
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

      {/* <SessionDetail {...data} />
      <Link href={`/session/schedule/${data.id}`} passHref>
        <Button sx={{ margin: '1em' }}>Schedule</Button>
      </Link>
      <div>
        <Typography color="sky.main" fontWeight={500}>
          Rating and Review
        </Typography>
        <RatingPanel reviewStat={data.reviewStat} />
      </div>
      <ReviewInput />
      {data.reviews.map((review) => (
        <ReviewEntry key={review.id} data={review} />
      ))} */}
    </Stack>
  )
}

export default ProfilePage

export const getServerSideProps = getServerSideUser()
