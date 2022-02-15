import TopNav from '@frontend/components/NavigationBar/TopNav'
import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import { useState } from 'react'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [wrongPassword, setWrongPassword] = useState(false)

  const submitLoginRequest = async () => {
    fetch('/api/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.replace('./home')
      }
      setWrongPassword(true)
      return
    })
  }

  return (
    <Container maxWidth="sm">
      <TopNav icon="back" title="Log in" href="./.." />

      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        {!wrongPassword && (
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
        )}
        {wrongPassword && (
          <TextField
            error
            fullWidth
            type="email"
            size="medium"
            label="Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          ></TextField>
        )}

        {!wrongPassword && (
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
        )}
        {wrongPassword && (
          <TextField
            error
            helperText="Incorrect Email or Password."
            fullWidth
            type="password"
            size="medium"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        )}

        <Typography variant="regular" component="a" color="primary" align="left">
          <Link href="/forgot-password">Forgot password?</Link>
        </Typography>

        <Typography variant="tiny" pt={8}>
          By continuing, you agree to our{' '}
          <Link href="login/terms-of-service">
            <Typography variant="tiny" component="a" color="primary">
              Terms of Service{' '}
            </Typography>
          </Link>
          and{' '}
          <Link href="login/privacy-policy">
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
