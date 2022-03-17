import {
  Drawer,
  DrawerProps,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material'
import { useResponsive } from 'libs/mui/src/hooks'
import { useRouter } from 'next/router'

import { useMemo, useState } from 'react'
import { FiMenu } from 'react-icons/fi'

import { Logo } from '../Logo'
import { UserBar } from '../UserBar'
import { adminListItems, expertListItems, nonUserListItems, userListItems } from './constants'
import { FlexList, Spacer } from './styled'
import { NavigationListItem } from './types'

export type UserRole = 'admin' | 'user' | 'expert' | 'none'

export interface NavBarProps {
  role: UserRole
  username?: string
  isLoggedIn?: boolean
}

interface NavBarListItemProps extends DrawerProps {
  items: NavigationListItem[]
}

const CustomDrawer: React.FC<NavBarListItemProps> = ({
  items,
  open,
  onClose,
  onKeyDown,
  onClick,
}) => {
  const theme = useTheme()

  const router = useRouter()
  const iconStyle = { width: 20, height: 20, strokeWidth: 1.5 }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Stack
        sx={{ minWidth: 250, height: '100%' }}
        role="presentation"
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <Stack pt={4} px={2} alignItems="center" justifyContent="center">
          <Logo />
        </Stack>
        <FlexList>
          {items.map((item, index) => {
            if (item.type === 'item') {
              const { text, Icon, href } = item
              return (
                <ListItem key={text} onClick={() => router.push(href)}>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 2 }}>
                      <Icon style={iconStyle} color={theme.palette.ink.dark} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            } else if (item.type === 'header') {
              const { header } = item
              return (
                <ListItem key={header}>
                  <ListItemText
                    primary={header}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: theme.palette.sky.dark,
                        fontSize: 12,
                      },
                    }}
                  />
                </ListItem>
              )
            } else if (item.type === 'bottom') {
              return <Spacer key={index} />
            }
            return null
          })}
        </FlexList>
      </Stack>
    </Drawer>
  )
}

export const NavBar: React.FC<NavBarProps> = ({ role = 'none', isLoggedIn, username }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const isMdUp = useResponsive('md', 'up')

  const itemList = useMemo(() => {
    switch (role) {
      case 'none':
        return nonUserListItems
      case 'user':
        return userListItems
      case 'expert':
        return expertListItems
      case 'admin':
        return adminListItems
      default:
        return []
    }
  }, [role])

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }
    setOpen((open) => !open)
  }

  return (
    <Stack
      component="nav"
      direction="row"
      py={[1.5, 2.5]}
      px={[2, 4.5]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo />
      {isMdUp ? (
        <UserBar items={itemList} isLoggedIn={isLoggedIn} username={username} />
      ) : (
        <>
          <Tooltip title="Open menu">
            <IconButton onClick={toggleDrawer}>
              <FiMenu color={theme.palette.ink.darkest} />
            </IconButton>
          </Tooltip>
          <CustomDrawer
            open={open}
            onClose={toggleDrawer}
            items={itemList}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          />
        </>
      )}
    </Stack>
  )
}
