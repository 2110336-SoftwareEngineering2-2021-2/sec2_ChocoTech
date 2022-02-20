import { IconButton, Stack, Typography, styled, useTheme } from '@mui/material'
import { useRouter } from 'next/router'

import { MouseEventHandler } from 'react'
import { FiChevronLeft, FiX } from 'react-icons/fi'

const IconContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  margin-left: ${({ theme }) => theme.spacing(3)};
`

export enum TopBarActionType {
  Close = 'close',
  Back = 'back',
  None = 'none',
}

export interface TopBarProps {
  title?: string
  action?: TopBarActionType
  onClose?: MouseEventHandler<HTMLButtonElement>
}

const ActionIcon: React.FC<Pick<TopBarProps, 'action' | 'onClose'>> = ({ action, onClose }) => {
  const router = useRouter()
  const theme = useTheme()

  const onClickBack = () => {
    router.back()
  }

  switch (action) {
    case TopBarActionType.Close:
      return (
        <IconButton onClick={onClose}>
          <FiX color={theme.palette.ink.darkest} />
        </IconButton>
      )
    case TopBarActionType.Back:
      return (
        <IconButton onClick={onClickBack}>
          <FiChevronLeft color={theme.palette.ink.darkest} />
        </IconButton>
      )
    default:
      return null
  }
}

const TopBar: React.FC<TopBarProps> = ({ title, action = TopBarActionType.None, onClose }) => {
  return (
    <Stack direction="row" justifyContent="center" sx={{ position: 'relative' }} p={1}>
      <IconContainer>
        <ActionIcon action={action} onClose={onClose} />
      </IconContainer>
      <Typography variant="large" color="ink.darkest" fontWeight={400}>
        {title}
      </Typography>
    </Stack>
  )
}

export default TopBar
