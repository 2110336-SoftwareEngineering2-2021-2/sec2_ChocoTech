import { Components, Theme } from '@mui/material'

export function overrideButtonBase(theme: Theme): Components['MuiButtonBase'] {
  return {
    defaultProps: {
      disableRipple: true,
    },
  }
}

export function overrideButton(theme: Theme): Components['MuiButton'] {
  return {
    defaultProps: {
      variant: 'contained',
      color: 'primary',
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 48,
        padding: theme.spacing(1, 3),
        transition: theme.transitions.create(['background-color', 'box-shadow', 'color']),
      },
    },
  }
}
