// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { BottomNavigation } from '@mui/material'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import React from 'react'

function BottomNav() {
  const [value, setValue] = React.useState(0)
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      sx={{ mt: 'auto' }}
    >
      {/* <BottomNavigationAction label="Feed" icon={<HomeOutlinedIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchOutlinedIcon />} />
      <BottomNavigationAction label="Notifications" icon={<NotificationsNoneOutlinedIcon />} />
      <BottomNavigationAction label="Me" icon={<PersonOutlineOutlinedIcon />} /> */}
    </BottomNavigation>
  )
}

export default BottomNav
