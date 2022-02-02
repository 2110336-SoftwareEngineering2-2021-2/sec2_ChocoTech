import { Components, Theme } from '@mui/material'

export default function overrideButtonBase(theme: Theme): Components['MuiButtonBase'] {
  return {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 48,
        transition: theme.transitions.create(['background-color', 'box-shadow']),
      },
    },
  }
}
