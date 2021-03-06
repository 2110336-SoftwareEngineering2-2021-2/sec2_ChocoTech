import { Stack, styled } from '@mui/material'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import toast from 'react-hot-toast'

import { SessionInfo } from './SessionHistoryCardMenu'

const BoxStyled = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ theme }) => theme.spacing(41)};
  background-color: white;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`
export interface SessionHistoryCancelButtonProps {
  sessionInfo: SessionInfo
  cancelSession: () => void
}
export function SessionHistoryCancelButton({
  sessionInfo,
  cancelSession,
}: SessionHistoryCancelButtonProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const showCancelToast = () =>
    toast('Your session has been cancelled.', {
      position: 'bottom-center',
      icon: '🗑️',
      style: {
        background: '#FF5247',
        color: '#fff',
      },
    })
  return (
    <div>
      <Typography onClick={handleOpen}>Cancel</Typography>
      <Modal open={open} onClose={handleClose}>
        <BoxStyled>
          <Stack display="flex" flexDirection="column" alignItems="center" gap="24px">
            <Stack display="flex" flexDirection="column" alignItems="center" gap="8px">
              <Typography variant="title3">Cancel session?</Typography>
              <Typography
                variant="regular"
                textAlign="center"
                color="ink.lighter"
                lineHeight={1.75}
              >
                Are you sure you want to cancel{' '}
                <Typography display="inline" variant="regular" fontWeight={700} color="ink.lighter">
                  {sessionInfo.title}{' '}
                </Typography>
                by
                <Typography display="inline" variant="regular" fontWeight={700} color="ink.lighter">
                  {' '}
                  {sessionInfo.expertName}
                </Typography>
                ?{' '}
                {sessionInfo.hasPenalty && (
                  <>
                    You will be deducted{' '}
                    <Typography
                      display="inline"
                      variant="regular"
                      fontWeight={700}
                      color="primary.main"
                    >
                      {' '}
                      {sessionInfo.deductAmount}{' '}
                    </Typography>{' '}
                    coins for cancelling within 3 days of the session date.
                  </>
                )}
              </Typography>
              <Typography
                variant="regular"
                textAlign="center"
                color="ink.lighter"
                lineHeight={1.75}
              >
                You will be refunded{' '}
                <Typography
                  display="inline"
                  variant="regular"
                  fontWeight={700}
                  color="primary.main"
                >
                  {' '}
                  {sessionInfo.refundAmount}{' '}
                </Typography>{' '}
                Doji coins.
              </Typography>
            </Stack>
            <Stack spacing={1.5}>
              <Button
                onClick={() => {
                  handleClose()
                  cancelSession()
                  showCancelToast()
                }}
              >
                Yes, cancel session
              </Button>
              <Button variant="text" onClick={handleClose}>
                No, thanks
              </Button>
            </Stack>
          </Stack>
        </BoxStyled>
      </Modal>
    </div>
  )
}
