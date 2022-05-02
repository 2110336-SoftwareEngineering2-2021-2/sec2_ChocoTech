import {
  Drawer,
  DrawerProps,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Stack,
  StackProps,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useResponsive } from 'libs/mui/src/hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { BsCoin } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'

import { stangToBathString } from '../../utils/stangToBathString'
import { Logo } from '../Logo'
import { UserBar } from '../UserBar'
import { adminListItems, expertListItems, nonUserListItems, userListItems } from './constants'
import { Coin, FlexList, Spacer } from './styled'
import { NavigationListItem, NavigationListItemItem } from './types'

export type UserRole = 'admin' | 'user' | 'expert' | 'none'

export interface NavBarProps extends StackProps {
  coin?: number
  role?: UserRole
  username?: string
  avartarSrc?: string
  displayName?: string
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

export const NavBar: React.FC<NavBarProps> = ({
  coin,
  role = 'none',
  username,
  avartarSrc,
  displayName,
  ...props
}) => {
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

  const itemNavList = useMemo(() => {
    return itemList.filter((item) => item.type === 'item' && !item?.isInUserMenu)
  }, [itemList]) as NavigationListItemItem[]

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
      height={[68, 68, 72]}
      mb={7}
      sx={{ boxShadow: 1, ...props.sx }}
      {...props}
    >
      <Logo />
      {isMdUp ? (
        <Stack spacing={5} direction="row" alignItems="center" justifyContent="center">
          {role === 'user' && (
            <Link href="/balance" passHref>
              <Coin>
                <BsCoin />
                <Typography variant="regular" color="ink.dark">
                  coin {stangToBathString(coin ?? 0)}
                </Typography>
              </Coin>
            </Link>
          )}
          {itemNavList.map((item) => (
            <Link href={`${item.href}`} key={item.text} passHref>
              <MuiLink variant="regular" color="ink.dark">
                {item.text}
              </MuiLink>
            </Link>
          ))}
          <UserBar
            avartarSrc={avartarSrc}
            items={itemList}
            isLoggedIn={role !== 'none'}
            username={username}
            displayName={displayName}
          />
        </Stack>
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
