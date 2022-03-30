import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { IMeResponseDTO } from '@libs/api'
import { CompactProfile } from '@libs/mui'
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import router from 'next/router'

import { ReactNode, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { FiDollarSign, FiEdit2, FiLayers, FiLock, FiLogOut } from 'react-icons/fi'
import { useMutation } from 'react-query'

import { ExpertCard } from './styled'

interface ListItemProps {
  href: string
  text: string
  icon: ReactNode
}

const expertApplicationRequest = async () => {
  await httpClient.post(`/expert/application`, {})
}

const ListItem: React.FC<ListItemProps> = ({ href, text, icon }) => {
  return (
    <Link href={href} passHref>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
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
    <Stack direction="column">
      <Typography variant="title3" py={2} px={3} mt={2}>
        Settings
      </Typography>
      <CompactProfile
        username={user.username}
        displayName={displayName}
        profileUrl={user.profilePictureURL}
      />
      <ExpertCard onClick={handleExpertApp}>
        <Typography variant="regular" fontWeight={700} color="white">
          Become expert
        </Typography>
        <Typography variant="small" fontWeight={400} color="white">
          To create your own sessions and make an income
        </Typography>
      </ExpertCard>
      <List component="nav" sx={{ mt: 2 }}>
        <Stack direction="column" spacing={1}>
          <ListItem href="/settings/profile" text="Edit Profile" icon={<FiEdit2 />} />
          <ListItem href="change-password" text="Change password" icon={<FiLock />} />
          <ListItem href="/balance" text="Wallet" icon={<FiDollarSign />} />
          <ListItem href="settings/experience" text="Experience" icon={<FiLayers />} />
          <ListItem
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
            text="Link with Google"
            icon={<FiLogOut />}
          />
          <ListItem href="/logout" text="Logout" icon={<FiLogOut />} />
        </Stack>
      </List>
    </Stack>
  )
}

export default SettingsPage

export const getServerSideProps = getServerSideUser()
