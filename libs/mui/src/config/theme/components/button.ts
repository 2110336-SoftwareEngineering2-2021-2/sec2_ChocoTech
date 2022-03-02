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
      size: 'large',
    },
    styleOverrides: {
      root: {
        borderRadius: 48,
        textTransform: 'none',
        padding: theme.spacing(0.5, 3),
        transition: theme.transitions.create(['background-color', 'box-shadow', 'color']),
      },
      sizeLarge: {
        height: 48,
      },
      sizeSmall: {
        height: 32,
        padding: theme.spacing(0.5, 2),
      },
    },
  }
}
