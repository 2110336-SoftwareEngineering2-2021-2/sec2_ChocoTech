import NotiDialog from '@frontend/components/NotiDialog/NotiDialog'
import { TopBar, TopBarModeType } from '@libs/mui'
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material'
import router from 'next/router'

import React from 'react'
import { BiPlus } from 'react-icons/bi'

interface TabPanelProps {
  index: number
  value: number
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function MySessionPage() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack>
      <TopBar
        button={{
          endIcon: <BiPlus />,
          label: 'New',
          onClick: handleClickOpen,
        }}
        mode={TopBarModeType.Heading}
        title="My Session"
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Active" {...a11yProps(0)} />
            <Tab label="Finished" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Active page
        </TabPanel>
        <TabPanel value={value} index={1}>
          Finished page
        </TabPanel>
      </Box>
      <NotiDialog
        open={open}
        labelheader="You have to register!"
        labelinfo="In order to create new session you have to apply for an experts first"
        onClose={handleClose}
        button1={{ label: 'Register', onClick: () => router.push('/register/expert') }}
        button2={{ label: 'No, thanks' }}
      />
    </Stack>
  )
}
MySessionPage.shouldAuthenticated = true
