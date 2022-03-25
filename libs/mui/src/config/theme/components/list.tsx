import { Components, Theme } from '@mui/material'

import { overrideTypography } from './typography'

export function overrideListItemText(theme: Theme): Components['MuiListItemText'] {
  return {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
      },
      primary: {
        color: theme.palette.ink.dark,
        fontSize: '14px',
        lineHeight: '16px',
        fontFamily: 'Inter',
        fontWeight: 400,
      },
    },
  }
}

export function overrideListItemButton(theme: Theme): Components['MuiListItemButton'] {
  return {
    styleOverrides: {
      root: {
        padding: theme.spacing(2, 2),
        borderRadius: theme.shape.borderRadius,
      },
    },
  }
}
