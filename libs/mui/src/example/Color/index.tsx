import isPropValid from '@emotion/is-prop-valid'
import { styled, useTheme } from '@mui/material'
import { get } from 'lodash'

const shouldForwardProp = (props: string) => isPropValid(props) && props !== 'color'

export interface ColorProps {
  color: string
}

const Color = styled('div', { shouldForwardProp })<ColorProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color, theme }) => get(theme.palette, color, 'transparent')};
`

export default Color
