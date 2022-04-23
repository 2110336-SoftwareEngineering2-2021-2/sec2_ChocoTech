import { Avatar, Button, Input, InputLabel, Stack, TextField } from '@mui/material'
import StatusBadge from 'libs/mui/src/lib/StatusBadge'
import { useRef, useState } from 'react'

function AvatarTestPage() {
  const inputRef = useRef<HTMLInputElement>()
  const [tracking, setTracking] = useState<string[]>([])
  const onClick = () => {
    if (inputRef.current) setTracking([...tracking, inputRef.current.value])
  }

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <InputLabel>Username: </InputLabel>
        <TextField inputRef={inputRef} />
        <Button onClick={onClick}>Track User</Button>
      </Stack>
      <Stack>
        {tracking.map((username) => (
          <Stack key={username} direction="row" alignItems="center" spacing="1em">
            <StatusBadge username={username}>
              <Avatar />
            </StatusBadge>
            <p>{username}</p>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default AvatarTestPage
