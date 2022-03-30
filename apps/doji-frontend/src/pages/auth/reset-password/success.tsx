import { ExtendedNextPage } from '@frontend/type'
import { Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const resetPasswordSuccess: ExtendedNextPage = () => {
  return (
    <Stack sx={{ minHeight: '100%' }} direction="column" justifyContent="center" flexGrow={1}>
      <Typography variant="title3" fontWeight={700} p={[2, 8]} align="center">
        Reset Password Success
      </Typography>
      <Link href="/login" passHref>
        <Button size="large" type="submit" color="primary" variant="contained">
          go to login
        </Button>
      </Link>
    </Stack>
  )
}

export default resetPasswordSuccess
