import { Avatar, AvatarProps, Badge } from '@mui/material'
import React from 'react'

export const OnlineStatusHookContext = React.createContext<UseOnlineStatusHookType>(() => false)

type StatusBadgeProp = { username: string; children: React.ReactChild }
type UseOnlineStatusHookType = (username: string) => boolean

function StatusAvatar(props: StatusBadgeProp & { useOnlineStatus: UseOnlineStatusHookType }) {
  const { username, avatar, ...additionalProps } = props
  const isOnline = props.useOnlineStatus(username)
  const color = isOnline ? 'green.main' : 'sky.main'

  return (
    <div>
      <Badge
        variant="dot"
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: color,
            border: `1px solid black`,
          },
        }}
      >
        {props.children}
      </Badge>
    </div>
  )
}

function WrappedStatusAvatar(props: StatusAvatarProp) {
  return (
    <OnlineStatusHookContext.Consumer>
      {(hook) => {
        return <StatusAvatar useOnlineStatus={hook} {...props} />
      }}
    </OnlineStatusHookContext.Consumer>
  )
}

export default WrappedStatusAvatar
