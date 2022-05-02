import { List, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'

import { IMeResponseDTO, UserRole } from '@libs/api'
import { CompactProfile } from '@libs/mui'

import { ListItemProps, listItems } from './constants'
import { ExpertCard, StyledListItemButton } from './styled'

const expertApplicationRequest = async () => {
  await httpClient.post(`/expert/application`, {})
}

const ListItem: React.FC<ListItemProps> = ({ href, text, icon: Icon }) => {
  return (
    <Link href={href} passHref>
      <StyledListItemButton>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={text} />
      </StyledListItemButton>
    </Link>
  )
}

interface SettingsPageProps {
  user: IMeResponseDTO
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
  const displayName = useMemo(() => {
    if (user.displayName) return user.displayName
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`

    return user.username
  }, [user])

  const expertApplicationMutation = useMutation(expertApplicationRequest, {
    onSuccess: () => {
      toast.success('Application successfull')
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const handleExpertApp = async () => {
    await expertApplicationMutation.mutate()
  }
  return (
    <Stack direction="column" mb={6}>
      <Typography variant="title3" py={2} px={3}>
        Settings
      </Typography>
      <CompactProfile
        username={user.username}
        displayName={displayName}
        profileUrl={user.profilePictureURL}
        isExpert={user.role === UserRole.EXPERT}
      />
      {user.role !== UserRole.EXPERT && (
        <ExpertCard onClick={handleExpertApp}>
          <Typography variant="regular" fontWeight={700} color="white">
            Become expert
          </Typography>
          <Typography variant="small" fontWeight={400} color="white">
            To create your own sessions and make an income
          </Typography>
        </ExpertCard>
      )}

      <List component="nav" sx={{ mt: 2 }}>
        <Stack direction="column" spacing={2}>
          {listItems.map((props) => (
            <ListItem key={props.text} {...props} />
          ))}
        </Stack>
      </List>
    </Stack>
  )
}

export default SettingsPage

export const getServerSideProps = getServerSideUser()
