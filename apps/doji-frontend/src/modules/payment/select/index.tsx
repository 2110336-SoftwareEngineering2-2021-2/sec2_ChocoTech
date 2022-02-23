import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { Tables, TopBarActionType } from '@libs/mui'
import { AvatarProps, Button, Stack, SxProps, Theme, useTheme } from '@mui/material'
import Link from 'next/link'

import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons/lib'

const SelectPaymentPage: ExtendedNextPage = () => {
  const theme = useTheme()

  const renderPaymentIcon = (type: PaymentType): AvatarProps | undefined => {
    const style: SxProps<Theme> = { background: 'transparent', width: 48, height: 48 }
    const iconProps: IconBaseProps = {
      color: theme.palette.primary.dark,
      style: { width: '100%', height: 30 },
    }
    switch (type) {
      case 'visa':
        return {
          children: <FaCcVisa {...iconProps} />,
          sx: style,
        }
      case 'mastercard':
        return {
          children: <FaCcMastercard {...iconProps} />,
          sx: style,
        }
      default:
        return undefined
    }
  }

  return (
    <Stack spacing={1}>
      <Tables content="Visa 7549" caption="main" avatar={renderPaymentIcon('visa')} />
      <Tables content="Mastercard 1296" caption="main" avatar={renderPaymentIcon('mastercard')} />
      <Stack pt={3}>
        <Link href="/payment/new" passHref>
          <Button>Add payment method</Button>
        </Link>
      </Stack>
    </Stack>
  )
}

SelectPaymentPage.topBarProps = {
  title: 'Choose a payment method',
  action: TopBarActionType.Close,
  onClose: (_, router) => {
    router.push('/profile')
  },
}

export default SelectPaymentPage
