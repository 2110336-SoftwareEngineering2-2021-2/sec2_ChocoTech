import { getServerSideUser } from '@frontend/common/auth'
import NotiDialog from '@frontend/components/NotiDialog/NotiDialog'
import { ExtendedNextPage } from '@frontend/type'
import { IMeResponseDTO } from '@libs/api'
import { CompactPrpfile } from '@libs/mui'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import { ReactNode, useMemo } from 'react'
import { FiDollarSign, FiEdit2, FiLayers, FiLock, FiLogOut } from 'react-icons/fi'

import { ExpertCard, ExpertCardBody, ExpertCardHeader } from './styled'

interface ListItemProps {
  href: string
  text: string
  icon: ReactNode
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

  return (
    <Stack direction="column">
      <Typography variant="title3" py={2} px={3}>
        Settings
      </Typography>
      <CompactPrpfile
        username={user.username}
        displayName={displayName}
        profileUrl={user.profilePictureURL}
      />
      <ExpertCard>
        <ExpertCardHeader>Become expert</ExpertCardHeader>
        <ExpertCardBody>To create your own sessions and make an income</ExpertCardBody>
      </ExpertCard>
      <List component="nav">
        <ListItem href="/settings/profile" text="Edit Profiel" icon={<FiEdit2 />} />
        <ListItem href="/settings/change-password" text="Change password" icon={<FiLock />} />
        <ListItem href="/settings/wallet" text="Wallet" icon={<FiDollarSign />} />
        <ListItem href="/settings/experience" text="Experience" icon={<FiLayers />} />
        <ListItem href="/logout" text="Logout" icon={<FiLogOut />} />
      </List>
    </Stack>
  )
}

export default SettingsPage

export const getServerSideProps = getServerSideUser()
