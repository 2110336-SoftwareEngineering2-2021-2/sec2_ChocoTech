import { Box, Button, Stack, Typography } from '@mui/material'

export function Index() {
  return (
    <Stack p={4} alignItems="center">
      <Typography variant="title3" fontWeight={700} p={4} align="center">
        Do
        <Typography variant="title3" component="span" color="primary">
          ji
        </Typography>
      </Typography>
      <Box
        component="img"
        alt=""
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Typography variant="title3" fontWeight={700}>
        Your{' '}
        <Typography variant="title3" component="span" color="primary">
          Crypto
        </Typography>
      </Typography>
      <Typography variant="title3" fontWeight={700}>
        Trading{' '}
        <Typography variant="title3" component="span" color="primary">
          Assistant
        </Typography>
      </Typography>
      <div>
        <Button>Create Account</Button>
      </div>
      <Typography variant="regular">
        Have an account?{' '}
        <Typography variant="regular" component="span" color="primary">
          Log in
        </Typography>
      </Typography>
    </Stack>
  )
}

export default Index
