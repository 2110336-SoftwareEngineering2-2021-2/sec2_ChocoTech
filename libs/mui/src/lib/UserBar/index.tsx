import { Avatar, ListItemIcon, Menu, MenuItem, Stack, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

import { NavigationListItem, NavigationListItemItem } from '../NavBar/types'

export interface UserBarProps {
  items: NavigationListItem[]
  username?: string
  isLoggedIn?: boolean
  avartarSrc?: string
  displayName?: string
}

const Hightlight = styled(Stack)`
  width: fit-content;
  transition: ${({ theme }) => theme.transitions.create('background-color')};
  border-radius: 100px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.sky.lighter};
  }
`

export const UserBar: React.FC<UserBarProps> = ({
  isLoggedIn = false,
  username,
  items,
  avartarSrc,
  displayName,
}) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const listItems = useMemo(() => {
    return items?.filter((item) => item.type === 'item' && item?.isInUserMenu)
  }, [items]) as NavigationListItemItem[] | undefined

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigateTo = (path: string) => () => {
    router.push(path)
  }

  if (!isLoggedIn || !username) return null
  return (
    <Stack p={0}>
      <Hightlight
        my={-1}
        py={1}
        pr={2}
        pl={1.5}
        spacing={1}
        direction="row"
        alignItems="center"
        onClick={handleClick}
      >
        <Avatar src={avartarSrc} sx={{ width: 32, height: 32 }}>
          {displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="regular" color="ink.dark" fontWeight={500}>
          {username}
        </Typography>
      </Hightlight>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {listItems?.map(({ text, Icon, href }) => (
          <MenuItem key={text} onClick={navigateTo(href)}>
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            {text}
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  )
}
