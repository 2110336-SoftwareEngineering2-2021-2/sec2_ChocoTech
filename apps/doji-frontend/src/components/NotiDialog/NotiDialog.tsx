import { Button, ButtonProps, Dialog, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import router from 'next/router'

export interface DialogProps {
  open: boolean
  onClose: (value: string) => void
  icon?: React.ReactNode
  labelheader: string
  labelinfo: string
  button1?: ButtonProps & {
    url: string
    label: string
  }
  button2?: ButtonProps & {
    label: string
  }
}

function NotiDialog({
  open,
  onClose,
  icon,
  button1,
  button2,
  labelheader,
  labelinfo,
}: DialogProps) {
  const handleClose = () => {
    onClose('')
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      {icon && (
        <Stack marginTop={3} alignItems="center">
          {icon}
        </Stack>
      )}
      <Stack margin={3}>
        <Typography fontWeight={700} variant="title3" align="center">
          {labelheader}
        </Typography>
        <br />
        <Typography fontWeight={400} variant="regular" align="center">
          {labelinfo}
        </Typography>
        {button1 && (
          <Button sx={{ mt: 3 }} onClick={() => router.push(button1.url)}>
            {button1.label}
          </Button>
        )}
        {button2 && (
          <Button variant="text" sx={{ mt: 2 }} onClick={handleClose}>
            {button2.label}
          </Button>
        )}
      </Stack>
    </Dialog>
  )
}
export default NotiDialog
