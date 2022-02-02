import { ButtonProps, Button as MuiButton } from '@mui/material'

export { ButtonProps }

export default function Button(props: ButtonProps) {
  return <MuiButton {...props} />
}
