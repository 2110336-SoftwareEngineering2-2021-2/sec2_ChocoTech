import { Button, Container, Link as MuiLink, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { ImGithub } from 'react-icons/im'

function Index() {
  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      flexGrow={1}
    >
      <Typography variant="title3" fontWeight={700} p={[2, 4]} align="center">
        Do
        <Typography variant="title3" component="span" color="primary">
          ji
        </Typography>
      </Typography>
      <Image src="/static/AL.png" alt="Picture of the author" width={327} height={327} />
      <Stack direction="column">
        <Typography align="center" variant="title3" fontWeight={700} pt={[2, 4]} lineHeight="32px">
          Your{' '}
          <Typography variant="title3" component="span" color="primary" lineHeight="32px">
            Crypto
          </Typography>
        </Typography>
        <Typography variant="title3" fontWeight={700} pb={[2, 11]} lineHeight="32px">
          Trading{' '}
          <Typography variant="title3" component="span" color="primary" lineHeight="32px">
            Assistant
          </Typography>
        </Typography>
      </Stack>
      <Stack direction="column" spacing={2} mb={5}>
        <Link href="/signup" passHref>
          <Button>Create Account</Button>
        </Link>
        <Typography variant="regular">
          Have an account?{' '}
          <Link href="/login" passHref>
            <MuiLink variant="regular" color="primary">
              Log in
            </MuiLink>
          </Link>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Index
