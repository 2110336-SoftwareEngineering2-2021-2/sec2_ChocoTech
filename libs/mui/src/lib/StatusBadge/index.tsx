import { Badge } from '@mui/material'
import React from 'react'

export const OnlineStatusHookContext = React.createContext<UseOnlineStatusHookType>(() => false)

type StatusBadgeProps = { username: string; children: React.ReactChild }
type UseOnlineStatusHookType = (username: string) => boolean

function StatusAvatar(props: StatusBadgeProps & { useOnlineStatus: UseOnlineStatusHookType }) {
  const { username, ...additionalProps } = props
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

function WrappedStatusAvatar(props: StatusBadgeProps) {
  return (
    <OnlineStatusHookContext.Consumer>
      {(hook) => {
        return <StatusAvatar useOnlineStatus={hook} {...props} />
      }}
    </OnlineStatusHookContext.Consumer>
  )
}

export default WrappedStatusAvatar
