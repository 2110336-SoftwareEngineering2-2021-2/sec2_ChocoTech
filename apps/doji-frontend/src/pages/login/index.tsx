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

import { useState } from 'react'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLoginRequest = async () => {
    const res = await fetch('/api/auth/password', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <Container maxWidth="sm">
      <Navbar action="back" title="Log in" href="/.." />

      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <TextField
          fullWidth
          type="email"
          size="medium"
          label="Email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        ></TextField>

        <TextField
          fullWidth
          type="password"
          size="medium"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        ></TextField>

        <Typography variant="regular" component="a" color="primary" align="left">
          <Link href="/ChangePassword" passHref>
            Forgot password?
          </Link>
        </Typography>

        <Typography variant="tiny" pt={8}>
          By continuing, you agree to our{' '}
          <Link href="login/terms-of-service" passHref>
            <Typography variant="tiny" component="a" color="primary">
              Terms of Service{' '}
            </Typography>
          </Link>
          and{' '}
          <Link href="login/privacy-policy" passHref>
            <Typography variant="tiny" component="a" color="primary">
              Privacy Policy
            </Typography>
          </Link>
          .
        </Typography>

        <Button size="large" onClick={submitLoginRequest}>
          Log in
        </Button>
      </Stack>
    </Container>
  )
}

export default Login
