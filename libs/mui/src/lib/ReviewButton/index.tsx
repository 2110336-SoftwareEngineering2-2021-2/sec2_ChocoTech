import { httpClient } from '@frontend/services'
import { IconButton, Menu, MenuItem } from '@mui/material'
import axios from 'axios'

import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export interface ReviewMenuProps {
  id: string
}
function ReviewMenu(props: ReviewMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  async function reportReview() {
    await httpClient.post(`review/report/${props.id}`)
  }
  return (
    <>
      <IconButton
        aria-label="more"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <BsThreeDotsVertical />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 0, horizontal: 47.5 }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={reportReview}>Report</MenuItem>
      </Menu>
    </>
  )
}
export default ReviewMenu
