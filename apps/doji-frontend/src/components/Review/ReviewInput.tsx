import { Stack, TextField } from '@mui/material'

import StatusAvatar from '@frontend/components/StatusAvatar'
import { useAuthStore } from '@frontend/stores'

function ReviewInput() {
  //TODO Connect API, Review PopUP
  const { user } = useAuthStore()
  return (
    <Stack direction="row" spacing="1em" alignItems="center">
      <StatusAvatar
        username={user.username}
        src="https://mui.com/static/images/avatar/3.jpg"
        sx={{ width: 40, height: 40 }}
      />
      <TextField fullWidth label="Review the session..." />
    </Stack>
  )
}

export default ReviewInput
