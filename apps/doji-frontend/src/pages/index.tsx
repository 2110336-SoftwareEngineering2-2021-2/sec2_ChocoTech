import { Box, Button } from '@mui/material'

export function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        p: 4,
      }}
    >
      <Box>Doji</Box>
      <Box
        component="img"
        alt=""
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Box>Your Crypto Traiding Assistant</Box>
      <Button>Create Account</Button>
      <Box>Have an account? Log in</Box>
    </Box>
  )
}

export default Index
