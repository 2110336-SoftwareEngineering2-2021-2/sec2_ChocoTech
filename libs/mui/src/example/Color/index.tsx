import { styled, useTheme } from '@mui/material/styles'
import { get } from 'lodash'

// import styled from '../../lib/styled/styled'

export interface ColorProps {
  color: string
}

const Color = styled('div')<ColorProps>(({ color, theme }) => {
  console.log('INNER_INNER', theme)
  return {
    width: 40,
    height: 40,
    backgroundColor: get(theme.palette, color, '#000'),
  }
})
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: ${({ color, theme }) => {
//     console.log('INNER_INNER', theme.palette)
//     return get(theme.palette, color) ?? '#000'
//   }};
// `

export default function ({ color }: ColorProps) {
  const theme = useTheme()
  console.log('INNER', theme)
  return <Color color={color} />
}
