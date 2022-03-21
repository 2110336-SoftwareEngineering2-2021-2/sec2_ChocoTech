import { List, styled } from '@mui/material'

export const FlexList = styled(List)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const Spacer = styled('div')`
  flex-grow: 1;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`
