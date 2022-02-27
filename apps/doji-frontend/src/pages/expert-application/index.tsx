import { TopBar, TopBarModeType } from '@libs/mui'
import { Box, Button, Dialog, Stack, Tab, Tabs, Typography } from '@mui/material'
import Link from 'next/link'

import React from 'react'
import { BiPlus } from 'react-icons/bi'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose('')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack margin={3}>
        <Typography fontWeight={700} variant="title3" align="center">
          You have to register!
        </Typography>
        <br />
        <Typography fontWeight={400} variant="regular" align="center">
          In order to create new session you have to apply for an experts first
        </Typography>
        <Link href="/expert-application/register" passHref>
          <Button sx={{ mt: 3 }}>Register</Button>
        </Link>
        <Button variant="text" sx={{ mt: 2 }} onClick={handleClose}>
          No, thanks
        </Button>
      </Stack>
    </Dialog>
  )
}

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
}

function TabPanel(props: TabPanelProps) {
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

  const handleClose = (value: string) => {
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
      <SimpleDialog open={open} onClose={handleClose} />
    </Stack>
  )
}
//ChangePasswordPage.shouldAuthenticated = true
