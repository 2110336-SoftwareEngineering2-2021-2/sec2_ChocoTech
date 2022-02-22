import { AppBar, Button, Container, Link, Stack, Toolbar, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'

function Complete() {
  const router = useRouter()
  return (
    <Stack
      sx={{ minHeight: '100%' }}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      flexGrow={1}
    >
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <Typography variant="h6" flexGrow={1} align="center">
            Register complete
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="column" mb="100%">
        <Typography variant="h6" pt={[2, 4]} lineHeight="32px">
          Welcome to Doji,{' '}
          <Typography variant="h6" component="span" color="primary" lineHeight="32px">
            {router.query.username}
          </Typography>
        </Typography>
        <Stack direction="column" spacing={2} m={5} alignItems="center">
          <Link href="../profile">
            <Button>View profile</Button>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Complete
