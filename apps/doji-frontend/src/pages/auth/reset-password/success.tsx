import { ExtendedNextPage } from '@frontend/type'
import { Button, Stack, Typography } from '@mui/material'

const resetPasswordSuccess: ExtendedNextPage = () => {
  return (
    <Stack sx={{ minHeight: '100%' }} direction="column" justifyContent="center" flexGrow={1}>
      <Typography variant="title3" fontWeight={700} p={[2, 8]} align="center">
        Reset Password Success
      </Typography>
      <Button href="/login" size="large" type="submit" color="primary" variant="contained">
        go to login
      </Button>
    </Stack>
  )
}

export default resetPasswordSuccess
