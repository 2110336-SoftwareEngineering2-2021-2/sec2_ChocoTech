import { Theme, useTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

export function useResponsive(
  size: keyof Theme['breakpoints']['values'] = 'sm',
  direction: 'up' | 'down' = 'up',
) {
  const theme = useTheme()
  const matchUp = useMediaQuery(theme.breakpoints.up(size))
  const matchDown = useMediaQuery(theme.breakpoints.down(size))

  return direction === 'up' ? matchUp : matchDown
}
