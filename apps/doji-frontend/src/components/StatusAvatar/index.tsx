import { Avatar, AvatarProps, Badge } from '@mui/material'

import { useOnlineStatus } from '@frontend/services/online-status'

function StatusAvatar(props: { username: string; avatar?: React.ReactNode } & AvatarProps) {
  const { username, avatar, ...additionalProps } = props
  const isOnline = useOnlineStatus(username)
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
        {avatar && <Avatar src="https://mui.com/static/images/avatar/2.jpg" {...additionalProps} />}
      </Badge>
    </div>
  )
}

export default StatusAvatar
