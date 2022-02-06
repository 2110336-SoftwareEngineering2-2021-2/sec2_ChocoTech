import { Box, Button, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export function Index() {
  return (
    <Stack p={4} alignItems="center">
      <Typography variant="title3" fontWeight={700} p={4} align="center">
        Do
        <Typography variant="title3" component="span" color="primary">
          ji
        </Typography>
      </Typography>
      <Box component="img" alt="" src="/static/AL.png" />
      <Typography variant="title3" fontWeight={700} pt={4} lineHeight="32px">
        Your{' '}
        <Typography variant="title3" component="span" color="primary" lineHeight="32px">
          Crypto
        </Typography>
      </Typography>
      <Typography variant="title3" fontWeight={700} pb={11} lineHeight="32px">
        Trading{' '}
        <Typography variant="title3" component="span" color="primary" lineHeight="32px">
          Assistant
        </Typography>
      </Typography>
      <div>
        <Link href="/register" passHref>
          <Button>Create Account</Button>
        </Link>
      </div>
      <Typography variant="regular" pt={3}>
        Have an account?{' '}
        <Link href="/login" passHref>
          <Typography variant="regular" component="a" color="primary">
            Log in
          </Typography>
        </Link>
      </Typography>
    </Stack>
  )
}

export default Index
