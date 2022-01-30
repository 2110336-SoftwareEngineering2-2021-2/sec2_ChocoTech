import { styled, useTheme } from '@mui/material'
import { get } from 'lodash'

// import styled from '../../lib/styled/styled'

export interface ColorProps {
  color: string
}

const Color = styled('div')<ColorProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color, theme }) => get(theme.palette, color, 'transparent')};
`

export default function ({ color }: ColorProps) {
  const theme = useTheme()
  console.log('INNER', theme)
  return <Color color={color} />
}
