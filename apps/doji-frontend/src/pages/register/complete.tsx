import { AppBar, Button, Container, Link, Stack, Toolbar, Typography, styled } from '@mui/material'

const StyledContainer = styled(Container)`
  display: flex;
  flex-grow: 1;
  min-height: 600px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`

function Complete() {
  return (
    <StyledContainer maxWidth="sm">
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
        <Stack direction="column" mb="40%">
          <Typography variant="h6" pt={[2, 4]} lineHeight="32px">
            Welcome to Doji,{' '}
            <Typography variant="h6" component="span" color="primary" lineHeight="32px">
              Uttanon
            </Typography>
          </Typography>
          <Stack direction="column" spacing={2} m={5} alignItems="center">
            <Link href="../profile">
              <Button>View profile</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </StyledContainer>
  )
}

export default Complete
