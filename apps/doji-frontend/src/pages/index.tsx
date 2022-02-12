import { Button, Container, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const StyledContainer = styled(Container)({
  minHeight: '100%',
})

export function Index() {
  return (
    <StyledContainer maxWidth="sm">
      <Stack direction="column" justifyContent="space-between" alignItems="center" pt={4}>
        <Typography variant="title3" fontWeight={700} p={[2, 4]} align="center">
          Do
          <Typography variant="title3" component="span" color="primary">
            ji
          </Typography>
        </Typography>
        <Image src="/static/AL.png" alt="Picture of the author" width={327} height={327}></Image>
        <Typography variant="title3" fontWeight={700} pt={[2, 4]} lineHeight="32px">
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
    </StyledContainer>
  )
}

export default Index
