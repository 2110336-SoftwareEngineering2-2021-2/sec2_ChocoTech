import {
  Box,
  Dialog,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
} from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiDelete, FiEdit2 } from 'react-icons/fi'

export interface AchievementProps {
  title: string
  desc: string
  src?: string
  editable?: boolean
}
const ImgFrame = styled(Image)`
  object-fit: contain;
`
const StyledImg = styled(Image)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`
export const Achievement: React.FC<AchievementProps> = ({ title, desc, src, editable = false }) => {
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  return (
    <Stack
      direction="row"
      spacing={1}
      py={2}
      px={3}
      mb={2}
      sx={{ width: '100%', boxSizing: 'border-box' }}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={2}>
        {src ? (
          <StyledImg src={src} width={102} height={102} onClick={handleOpen} />
        ) : (
          <Box width={102} height={102} bgcolor="sky.light" borderRadius={1} />
        )}

        <Dialog onClose={handleClose} open={open} fullScreen>
          <ImgFrame src={src} layout="fill" onClick={handleClose} />
        </Dialog>

        <Stack direction="column" spacing={1} justifyContent="flex-start">
          <Typography variant="regular" fontWeight={700} color="ink.darkest">
            {title}
          </Typography>
          <Typography variant="tiny" fontWeight={400} color="ink.main">
            {desc}
          </Typography>
        </Stack>
      </Stack>
      {editable && (
        <div>
          <IconButton onClick={handleMenuOpen}>
            <BsThreeDotsVertical />
          </IconButton>
        </div>
      )}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 91,
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <FiEdit2 />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FiDelete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  )
}
