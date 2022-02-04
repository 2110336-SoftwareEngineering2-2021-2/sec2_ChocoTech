import {
  Avatar,
  Button,
  AvatarProps as MuiAvatarProps,
  ButtonProps as MuiButtonProps,
  Link as MuiLink,
  SwitchProps as MuiSwitchProps,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import Link, { LinkProps } from 'next/link'

import { useCallback } from 'react'

export enum TablesActionType {
  Link = 'link',
  Button = 'button',
  Switch = 'switch',
  None = 'none',
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
  | {
      type: TablesActionType.None
    }

export interface TablesProps {
  content: string
  caption?: string
  action?: TableActionProps
  avatar?: MuiAvatarProps
}

const Tables: React.FC<TablesProps> = ({
  content,
  caption,
  action = { type: 'none' },
  avatar: avartarProps,
}) => {
  console.log('TABLES', avartarProps)

  const renderAction = useCallback(() => {
    console.log('RENDER', avartarProps)
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
    return null
  }, [action])

  return (
    <Stack
      direction="row"
      p={1.5}
      justifyContent="space-between"
      alignItems="center"
      sx={{ minHeight: 64 }}
    >
      <Stack direction="row" gap={1.5} justifyContent="space-between" alignItems="center">
        {avartarProps && (
          <Avatar {...avartarProps} sx={{ ...avartarProps.sx, width: 40, height: 40 }} />
        )}
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
    </Stack>
  )
}

export default Tables
