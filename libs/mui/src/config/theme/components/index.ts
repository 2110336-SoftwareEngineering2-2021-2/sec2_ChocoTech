import { Components, Theme } from '@mui/material'

import { overrideButton, overrideButtonBase } from './button'
import { overrideTypography } from './typography'

export default function overrideComponents(theme: Theme): Components {
  return {
    MuiButtonBase: overrideButtonBase(theme),
    MuiButton: overrideButton(theme),
    MuiTypography: overrideTypography(theme),
  }
}
