import { Button, Dialog, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'

import React from 'react'

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
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
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
        <StyledImg src={src} width={102} height={102} onClick={handleOpen} />
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
      {editable && <Button>tmp</Button>}
    </Stack>
  )
}
