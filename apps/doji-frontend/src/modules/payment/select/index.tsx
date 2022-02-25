import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { Tables, TopBarActionType } from '@libs/mui'
import { AvatarProps, Button, Stack, SxProps, Theme, useTheme } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import Omise from 'omise'

import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { IconBaseProps } from 'react-icons/lib'
import { useQuery } from 'react-query'

const SelectPaymentPage: ExtendedNextPage = () => {
  const theme = useTheme()

  const { data, isLoading, isError } = useQuery<Omise.Cards.ICard[], AxiosError>(
    `/payment/cards`,
    async () => {
      const { data } = await httpClient.get<Omise.Cards.ICard[]>('/payment/cards')
      return data
    },
  )

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

  if (isLoading) return null

  if (isError) return <div>Error</div>

  console.log(data)

  return (
    <Stack spacing={1}>
      {data.map((card) => (
        <Tables
          key={card.id}
          content={`${card.brand} ${card.last_digits}`}
          avatar={renderPaymentIcon(card.brand.toLowerCase() as PaymentType)}
        />
      ))}
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

SelectPaymentPage.shouldAuthenticated = true

export default SelectPaymentPage
