import { ThemeProvider } from '@mui/material'

import theme from '../src/config/theme'

const ThemeDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
)

export const decorators = [ThemeDecorator]
