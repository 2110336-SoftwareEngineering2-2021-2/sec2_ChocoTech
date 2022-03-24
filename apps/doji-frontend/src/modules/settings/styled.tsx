import { Typography, styled } from '@mui/material'

export const ExpertCard = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2.5, 2)};
  background: ${({ theme }) => theme.palette.primary.main};
`

export const ExpertCardHeader = styled(Typography)``
ExpertCardHeader.defaultProps = {
  variant: 'large',
  fontWeight: 700,
  color: 'white',
}

export const ExpertCardBody = styled(Typography)``
ExpertCardHeader.defaultProps = {
  variant: 'small',
  fontWeight: 400,
  color: 'white',
}
