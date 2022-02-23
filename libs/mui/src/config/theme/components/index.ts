import { Components, Theme } from '@mui/material'

import { overrideButton, overrideButtonBase } from './button'
import { overrideSwitch } from './switch'
import { overrideFilledInput, overrideOutlinedInput, overrideTextField } from './textfield'
import { overrideLink, overrideTypography } from './typography'

export default function overrideComponents(theme: Theme): Components {
  return {
    MuiButtonBase: overrideButtonBase(theme),
    MuiButton: overrideButton(theme),
    MuiTypography: overrideTypography(theme),
    MuiTextField: overrideTextField(theme),
    MuiOutlinedInput: overrideOutlinedInput(theme),
    MuiFilledInput: overrideFilledInput(theme),
    MuiLink: overrideLink(theme),
    MuiSwitch: overrideSwitch(theme),
  }
}
