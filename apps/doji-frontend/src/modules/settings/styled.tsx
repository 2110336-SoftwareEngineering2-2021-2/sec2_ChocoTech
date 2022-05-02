import { ListItemButton, Typography, styled } from '@mui/material'

export const ExpertCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2.5, 3)};
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 12px;
  transition: ${({ theme }) => theme.transitions.create('background')};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`

export const StyledListItemButton = styled(ListItemButton)`
  border: 1px solid ${({ theme }) => theme.palette.sky.lighter};
  padding: ${({ theme }) => theme.spacing(2, 4)};
  &:hover {
    background: ${({ theme }) => theme.palette.sky.lighter};
  }
  .MuiListItemIcon-root {
    margin-right: ${({ theme }) => theme.spacing(-2)};
  }
`
