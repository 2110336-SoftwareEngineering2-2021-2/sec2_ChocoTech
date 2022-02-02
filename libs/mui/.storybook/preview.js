import { ThemeProvider } from '@mui/material'

import { theme } from '../src/config/theme'

const ThemeDecorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
}

export const decorators = [ThemeDecorator]

export const parameters = {
  controls: { expanded: true },
}
