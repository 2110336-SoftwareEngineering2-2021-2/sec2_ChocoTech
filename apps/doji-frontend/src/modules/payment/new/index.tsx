import { ExtendedNextPage } from '@frontend/type'
import { Tables, TopBarActionType } from '@libs/mui'
import { AvatarProps, Stack, SxProps, Theme, useTheme } from '@mui/material'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import { FiBriefcase, FiCreditCard } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons/lib'

type AddNewPaymentType = 'bank-account' | 'credit-card'

const AddNewPaymentPage: ExtendedNextPage = () => {
  const theme = useTheme()
  const router = useRouter()

  const renderPaymentIcon = (type: AddNewPaymentType): AvatarProps | undefined => {
    const style: SxProps<Theme> = { background: 'transparent', width: 48, height: 48 }
    const iconProps: IconBaseProps = {
      color: theme.palette.ink.darkest,
      style: { width: '100%', height: 30 },
    }
    switch (type) {
      case 'bank-account':
        return {
          children: <FiBriefcase {...iconProps} />,
          sx: style,
        }
      case 'credit-card':
        return {
          children: <FiCreditCard {...iconProps} />,
          sx: style,
        }
      default:
        return undefined
    }
  }

  const handleAddNewPayment = useCallback(
    (type: AddNewPaymentType) => {
      router.push(`/payment/new/${type}`)
    },
    [router],
  )

  return (
    <Stack spacing={1}>
      <Tables
        content="Add New Bank Account"
        avatar={renderPaymentIcon('bank-account')}
        onClick={() => handleAddNewPayment('bank-account')}
      />
      <Tables
        content="Add New Credit Card"
        avatar={renderPaymentIcon('credit-card')}
        onClick={() => handleAddNewPayment('credit-card')}
      />
    </Stack>
  )
}

export default AddNewPaymentPage
