import Navbar from '@frontend/components/navbar'
import { Container, Stack, Typography } from '@mui/material'

export function PrivatePolicy() {
  return (
    <Container maxWidth="sm">
      <Navbar action="exit" title="Private Policy" href="/login" />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <Typography variant="body1" fontWeight={400}>
          <ol>
            <li>Private Policy</li>
            <li>Private Policy</li>
            <li>Private Policy</li>
          </ol>
        </Typography>
      </Stack>
    </Container>
  )
}

export default PrivatePolicy
