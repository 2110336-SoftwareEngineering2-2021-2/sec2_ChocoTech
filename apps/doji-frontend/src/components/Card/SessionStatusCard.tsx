import { SessionStatus } from '@libs/api'
import { Box, Theme, Typography, styled, useTheme } from '@mui/material'

import { AiOutlineCalendar } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

export interface SessionStatusProps {
  status: SessionStatus
}
function getColor(status: SessionStatus, theme: Theme) {
  if (status === SessionStatus.PENDING) return theme.palette.sky.lightest
  else if (status === SessionStatus.ACCEPTED) return theme.palette.green.lightest
  return theme.palette.red.lightest
}
function getColor2(status: SessionStatus, theme: Theme) {
  if (status === SessionStatus.PENDING) return theme.palette.sky.dark
  else if (status === SessionStatus.ACCEPTED) return theme.palette.green.dark
  return theme.palette.red.dark
}
function getIcon(status: SessionStatus, theme: Theme) {
  if (status === SessionStatus.PENDING) return <BiLoader color={theme.palette.sky.dark} />
  else if (status === SessionStatus.ACCEPTED)
    return <AiOutlineCalendar color={theme.palette.green.dark} />
  return <IoMdClose color={theme.palette.red.dark} />
}
function getText(status: SessionStatus, theme: Theme) {
  if (status === SessionStatus.PENDING) return 'Expert is pending'
  else if (status === SessionStatus.ACCEPTED) return 'Expert has accepted'
  else if (status === SessionStatus.CANCELED) return 'You cancelled'
  return 'Expert has declined'
}
const StyleStack = styled('div')<SessionStatusProps>`
  width: fit-content;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(1)};
  align-items: 'center';
  background-color: ${({ theme, status }) => getColor(status, theme)};
  padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)};
  border-radius: 8px;
`
function SessionStatusCard({ status }: SessionStatusProps) {
  const theme = useTheme()
  return (
    <StyleStack status={status}>
      {getIcon(status, theme)}
      <Typography color={getColor2(status, theme)} variant="small" fontWeight={400}>
        {getText(status, theme)}
      </Typography>
    </StyleStack>
  )
}
export default SessionStatusCard
