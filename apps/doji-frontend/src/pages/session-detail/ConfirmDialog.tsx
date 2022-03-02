import { Box, Button, Dialog, DialogTitle, Typography } from '@mui/material'

export function ConfirmDialog(props) {
  const onClose = props.onClose
  const confirm = props.confirm
  const isOpen = props.isOpen
  const handleClose = (value) => {
    onClose(value)
  }
  return (
    <Dialog
      onClose={() => {
        handleClose(false)
      }}
      open={isOpen}
    >
      <DialogTitle>
        <Box textAlign={'center'} padding={1} maxWidth={300}>
          <Typography variant="title3" fontWeight={700} sx={{ margin: 1 }}>
            Schedule session?
          </Typography>
          <br />
          <Typography variant="regular" fontWeight={400} sx={{ margin: 1 }}>
            Are you sure you want to create this session? You will be deducted 500 Doji coins
          </Typography>
          <br />
          <Button
            sx={{ margin: 1 }}
            fullWidth
            onClick={() => {
              handleClose(true)
            }}
          >
            Yes, schedule
          </Button>
          <br />
          <Button
            variant="outlined"
            sx={{ margin: 1 }}
            fullWidth
            onClick={() => {
              handleClose(false)
            }}
          >
            No, thanks
          </Button>
        </Box>
      </DialogTitle>
    </Dialog>
  )
}

export default ConfirmDialog
