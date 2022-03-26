import { Avatar, Stack, TextField } from '@mui/material'

function ReviewInput() {
  //TODO Connect API, Review PopUP
  return (
    <Stack direction="row" spacing="1em" alignItems="center">
      <Avatar src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }} />
      <TextField fullWidth label="Review the session..." />
    </Stack>
  )
}

export default ReviewInput
