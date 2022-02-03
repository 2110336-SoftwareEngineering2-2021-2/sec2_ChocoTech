import { Typography as MuiTypography, TypographyProps } from '@mui/material'

export { TypographyProps }

export default function Button(props: TypographyProps) {
  return <MuiTypography {...props} />
}
