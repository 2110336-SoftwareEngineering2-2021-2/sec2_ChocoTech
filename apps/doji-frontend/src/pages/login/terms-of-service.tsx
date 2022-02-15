import Navbar from '@frontend/components/navbar'
import { Container, Stack, Typography } from '@mui/material'

export function TermsOfService() {
  return (
    <Container maxWidth="sm">
      <Navbar action="exit" title="Terms of Service" href="/login" />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <Typography variant="body1" fontWeight={400}>
          Terms of Service Terms of Service Terms of Service
        </Typography>
      </Stack>
    </Container>
  )
}

export default TermsOfService
