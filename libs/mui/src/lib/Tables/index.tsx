import {
  Avatar,
  Button,
  IconButton,
  MenuProps,
  AvatarProps as MuiAvatarProps,
  ButtonProps as MuiButtonProps,
  Link as MuiLink,
  SwitchProps as MuiSwitchProps,
  Stack,
  StackProps,
  Switch,
  Typography,
} from '@mui/material'
import Link, { LinkProps } from 'next/link'

import { useCallback, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'

import { CustomMenu } from './menu'
import { StyledBadge, StyledStack } from './styled'

export enum TablesActionType {
  Link = 'link',
  Button = 'button',
  Switch = 'switch',
  Menu = 'menu',
  None = 'none',
}

export enum TablesAvatarStatus {
  None = 'none',
  Online = 'online',
  Offline = 'offline',
}

export type TableActionProps =
  | ({
      type: TablesActionType.Button
    } & Omit<MuiButtonProps, 'type'>)
  | ({
      type: TablesActionType.Switch
    } & MuiSwitchProps)
  | ({
      type: TablesActionType.Link
      text: string
    } & LinkProps)
  | ({
      type: TablesActionType.Menu
    } & Omit<MenuProps, 'anchorEl' | 'open'>)
  | {
      type: TablesActionType.None
    }

export interface TablesProps extends StackProps {
  content: string
  caption?: string
  action?: TableActionProps
  avatar?: MuiAvatarProps & {
    status?: TablesAvatarStatus
  }
  hoverable?: boolean
}

export const Tables: React.FC<TablesProps> = ({
  content,
  caption,
  action = { type: 'none' },
  avatar: avartarProps,
  hoverable = true,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const renderAction = useCallback(() => {
    if (action.type === TablesActionType.Button) {
      const { type, ...props } = action
      return <Button variant="contained" color="primary" size="small" {...props} />
    }
    if (action.type === TablesActionType.Switch) {
      const { type, ...props } = action
      return <Switch {...props} />
    }
    if (action.type === TablesActionType.Link) {
      const { type, text, ...props } = action
      return (
        <Link {...props} passHref>
          <MuiLink variant="regular">{text}</MuiLink>
        </Link>
      )
    }
    if (action.type === TablesActionType.Menu) {
      const { type, ...props } = action
      return (
        <>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <FiMoreVertical />
          </IconButton>
          <CustomMenu
            {...props}
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            onClose={handleClose}
          />
        </>
      )
    }
    return null
  }, [action, anchorEl])

  return (
    <StyledStack
      direction="row"
      p={1.5}
      justifyContent="space-between"
      alignItems="center"
      sx={{ minHeight: 64, ...props.sx }}
      hoverable={hoverable}
      {...props}
    >
      <Stack direction="row" gap={1.5} justifyContent="space-between" alignItems="center">
        {avartarProps &&
          (avartarProps.status && avartarProps.status !== TablesAvatarStatus.None ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              status={avartarProps.status}
            >
              <Avatar {...avartarProps} sx={{ width: 40, height: 40, ...avartarProps.sx }} />
            </StyledBadge>
          ) : (
            <Avatar {...avartarProps} sx={{ width: 40, height: 40, ...avartarProps.sx }} />
          ))}
        <Stack direction="column" spacing={0.5}>
          <Typography variant="regular" fontWeight={400} color="ink.darkest">
            {content}
          </Typography>
          {caption && (
            <Typography variant="small" fontWeight={100} color="ink.lighter">
              {caption}
            </Typography>
          )}
        </Stack>
      </Stack>
      {renderAction()}
    </StyledStack>
  )
}
