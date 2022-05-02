import isPropValid from '@emotion/is-prop-valid'
import { List, Stack, styled } from '@mui/material'

export const FlexList = styled(List)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Spacer = styled('div')`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const Coin = styled('div')`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ theme }) => theme.palette.sky.lightest};
  transition: ${({ theme }) => theme.transitions.create('background-color')};
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.palette.primary.main};
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.sky.lighter};
  }
`
