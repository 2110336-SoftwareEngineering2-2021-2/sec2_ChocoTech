import { AppBar, Grid, IconButton, Stack, Toolbar, Typography, styled } from '@mui/material'

import { IoIosArrowBack } from 'react-icons/io'

const StyledAppBar = styled('div')({
  boxShadow: 'none',
  backgroundColor: 'white',
  color: 'black',
})
export function ChangePasswordBar() {
  return (
    <StyledAppBar
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        color: 'black',
      }}
    >
      <Stack direction="row">
        <IconButton edge="start" aria-label="menu" size="large" sx={{ margin: '5px' }}>
          <IoIosArrowBack></IoIosArrowBack>
        </IconButton>
        <Typography variant="large" fontWeight="400" margin="auto">
          Change Password
        </Typography>
      </Stack>
    </StyledAppBar>
  )
}
export default ChangePasswordBar
