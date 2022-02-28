import { TopBar, TopBarActionMode } from '@libs/mui'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { BottomNavigation, BottomNavigationAction, Box, Tab } from '@mui/material'

import React from 'react'
import { RiHomeLine } from 'react-icons/ri'

import Pending from './pending'

function Index() {
  const [page, setPage] = React.useState('1')
  const handleChange = (event, newPage) => {
    setPage(newPage)
  }
  return (
    <Box>
      <TabContext value={page}>
        <TopBar mode={TopBarActionMode.Heading} title="Expert Requests" />
        <Box textAlign={'center'}>
          <TabList onChange={handleChange}>
            <Tab label="Pending" value={'1'} sx={{ width: '50%' }} />
            <Tab label="Responded" value={'2'} sx={{ width: '50%' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Pending />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </TabContext>
      <Box>
        <BottomNavigation>
          <BottomNavigationAction label="Home" icon={<RiHomeLine />} />
          <BottomNavigationAction label="My Session" />
          <BottomNavigationAction label="Requests" />
          <BottomNavigationAction label="Profile" />
        </BottomNavigation>
      </Box>
    </Box>
  )
}
export default Index
