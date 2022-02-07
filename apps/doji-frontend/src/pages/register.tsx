import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { AppBar, Button, IconButton, TextField, Toolbar } from '@mui/material'
import { Typography } from '@mui/material'
import MobileStepper from '@mui/material/MobileStepper'
import { useTheme } from '@mui/material/styles'

import React from 'react'

function Register() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  return (
    <div>
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Choose Username
            </Typography>
          </Toolbar>
        </AppBar>
        <Typography></Typography>
      </div>
      <div>
        <Typography>Choose a username for your new account.</Typography>
        <Typography>You cannot change your username later.</Typography>
      </div>
      <div>
        <TextField required id="outlined-required" label="Username" />
      </div>

      <div>
        <Button onClick={handleNext} disabled={activeStep === 3}>
          {activeStep >= 2 ? 'Proceed' : 'Next'}
        </Button>
        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          backButton={''}
          nextButton={''}
        />
      </div>
    </div>
  )
}

export default Register
