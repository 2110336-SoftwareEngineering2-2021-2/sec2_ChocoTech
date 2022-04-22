import { Avatar, Badge, Stack } from '@mui/material'

import { useOnlineStatus } from '@frontend/services/online-status'

function StatusAvatar(props: { username: string }) {
  const status = useOnlineStatus(props.username)
  const color = status ? 'green.main' : 'sky.main'

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
        <Avatar src="https://mui.com/static/images/avatar/2.jpg" />
      </Badge>
    </div>
  )
}

export default StatusAvatar
