import { Typography, styled } from '@mui/material'

export const ExpertCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2.5, 3)};
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 12px;
  transition: ${({ theme }) => theme.transitions.create('background')};
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`
