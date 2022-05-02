import { Stack, styled } from '@mui/material'

export const PaymentMethodPlaceholder = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`
