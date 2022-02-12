import Navbar from '@frontend/components/navbar'
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'

export function Login() {
  return (
    <Container maxWidth="sm">
      <Navbar action="back" title="Log in" href="/" />

      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <TextField fullWidth size="medium" label="Email"></TextField>

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput id="outlined-adornment-password" type="password" label="Password" />
        </FormControl>

        <Typography variant="regular" color="primary" fontWeight={400} align="left">
          <Link href="/" passHref>
            <a>Forgot password?</a>
          </Link>
        </Typography>

        <Typography variant="tiny" pt={8}>
          By continuing, you agree to our{' '}
          <Link href="/terms-of-service" passHref>
            <Typography variant="tiny" component="a" color="primary">
              Terms of Service{' '}
            </Typography>
          </Link>
          and{' '}
          <Link href="/privacy-policy" passHref>
            <Typography variant="tiny" component="a" color="primary">
              Privacy Policy
            </Typography>
          </Link>
          .
        </Typography>

        <Link href="/home" passHref>
          <Button size="large">Log in</Button>
        </Link>
      </Stack>
    </Container>
  )
}

export default Login
