import { SessionInfo } from '@frontend/components/Card/SessionHistoryCardMenu'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import * as React from 'react'
import toast from 'react-hot-toast'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 327,
  bgcolor: 'background.paper',
  p: 3,
  borderRadius: 2,
}

export default function SessionHistoryCancelButton(props: SessionInfo) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const CreateToast = () =>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box display="flex" flexDirection="column" alignItems="center" gap="24px">
            <Box display="flex" flexDirection="column" alignItems="center" gap="8px">
              <Typography variant="title3">Cancel session?</Typography>
              <Typography
                variant="regular"
                textAlign="center"
                color="ink.lighter"
                lineHeight={1.75}
              >
                Are you sure you want to cancel{' '}
                <Typography display="inline" variant="regular" fontWeight={700} color="ink.lighter">
                  {props.title}{' '}
                </Typography>
                by
                <Typography display="inline" variant="regular" fontWeight={700} color="ink.lighter">
                  {' '}
                  {props.expertName}
                </Typography>
                ?{' '}
                {props.hasPenalty && (
                  <>
                    You will be deducted{' '}
                    <Typography
                      display="inline"
                      variant="regular"
                      fontWeight={700}
                      color="primary.main"
                    >
                      {' '}
                      {props.deductAmount}{' '}
                    </Typography>{' '}
                    coins for cancelling within 7 days of the session date.
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
                  {props.refundAmount}{' '}
                </Typography>{' '}
                Doji coins.
              </Typography>
            </Box>
            <Stack spacing={1.5}>
              <Button
                onClick={() => {
                  handleClose()
                  CreateToast()
                }}
              >
                Yes, cancel session
              </Button>
              <Button variant="text" onClick={() => handleClose()}>
                No, thanks
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
