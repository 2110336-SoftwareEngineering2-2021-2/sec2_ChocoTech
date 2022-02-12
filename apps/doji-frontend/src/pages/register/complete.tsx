import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { margin } from '@mui/system'
import { useRouter } from 'next/router'

import React from 'react'

function Complete() {
  const router = useRouter()
  const handleClick = () => {
    {
      router.push('./profile')
    }
  }

  return (
    <div>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" flexGrow={1} textAlign="center">
            Register complete
          </Typography>
        </Toolbar>
      </AppBar>

      <Typography textAlign="center" marginTop={30}>
        Welcome to Doji {/*username*/}
      </Typography>
      <Button sx={{ marginX: '30%', marginTop: 2 }}>View profile</Button>
    </div>
  )
}

export default Complete
