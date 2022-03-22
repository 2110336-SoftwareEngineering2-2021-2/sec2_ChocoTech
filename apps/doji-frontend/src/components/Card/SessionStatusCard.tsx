import { Box, Typography, styled } from '@mui/material'

import { AiOutlineCalendar } from 'react-icons/ai'
import { BiLoader } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

export interface SessionStatusProps {
  is_pending: boolean
  is_accepted: boolean
  is_cancel: boolean
}
function SessionStatusCard(props: SessionStatusProps) {
  const StyleStack = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing(1)};
    align-items: 'center';
    background-color: ${({ theme }) =>
      props.is_pending
        ? theme.palette.sky.lightest
        : props.is_accepted
        ? theme.palette.green.lightest
        : theme.palette.red.lightest};
    padding: ${({ theme }) => theme.spacing(0.75)} ${({ theme }) => theme.spacing(1.5)};
    border-radius: 8px;
  `
  return (
    <StyleStack>
      {props.is_pending ? (
        <BiLoader color="#979C9E" />
      ) : props.is_accepted ? (
        <AiOutlineCalendar color="#198155" />
      ) : (
        <IoMdClose color="#D3180C" />
      )}
      <Typography
        color={props.is_pending ? '#979C9E' : props.is_accepted ? '#198155' : '#D3180C'}
        variant="small"
        fontWeight={400}
      >
        {props.is_pending
          ? 'Expert is pending'
          : props.is_accepted
          ? 'Expert has accepted'
          : props.is_cancel
          ? 'You cancelled'
          : 'Expert has declined'}
      </Typography>
    </StyleStack>
  )
}
export default SessionStatusCard
