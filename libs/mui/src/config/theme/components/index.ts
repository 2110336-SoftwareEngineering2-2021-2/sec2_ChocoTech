import { Components, Theme } from '@mui/material'

import overrideButtonBase from './button'
import overrideTypography from './typography'

export default function overrideComponents(theme: Theme): Components {
  return {
    MuiButtonBase: overrideButtonBase(theme),
    MuiTypography: overrideTypography(theme),
  }
}
