// import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Box, Stack, Typography, styled } from '@mui/material'

const NavLayout = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => theme.spacing(2)};
`
function TopNav(props) {
  return (
    <NavLayout>
      {/* {props.icon == 'back' && <ArrowBackIosNewOutlinedIcon />}
      {props.icon == 'close' && <CloseOutlinedIcon />} */}
      <Typography>My details</Typography>
      <Box width="24px" height="24px"></Box>
    </NavLayout>
  )
}

export default TopNav
