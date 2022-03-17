import { DialogState, TopUpDialog } from '@frontend/components/TopUpDialog'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { stangToBathString } from '@frontend/utils/stangBathToString'
import { IDepositRequest, IErrorMessage, IMeResponseDTO, IUser } from '@libs/api'
import { Tables, TablesActionType, TopBarActionType } from '@libs/mui'
import {
  AvatarProps,
  Button,
  Drawer,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import Omise from 'omise'

import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { IconBaseProps } from 'react-icons/lib'
import { useMutation, useQuery } from 'react-query'

const SelectPaymentPage: ExtendedNextPage = () => {
  const theme = useTheme()
  const [targetCard, setTargetCard] = useState<string | null>(null)

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

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<IMeResponseDTO>('/auth/me', () => httpClient.get('/auth/me').then((res) => res.data))

  const depositMutation = useMutation<unknown, AxiosError<IErrorMessage>, IDepositRequest>(
    `/payment/deposit`,
    (data) => httpClient.post('/payment/deposit', data),
  )

  const deleteCreditCardMutation = useMutation<void, AxiosError<IErrorMessage>, { cardId: string }>(
    `/payment/cards`,
    (data) => httpClient.delete(`/payment/cards/${data.cardId}`),
  )

  const handleDeleteCreditCard = async (targetCardId: string) => {
    toast.promise(deleteCreditCardMutation.mutateAsync({ cardId: targetCardId }), {
      loading: 'loading',
      success: 'delete success',
      error: 'fail to delete card',
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (isLoading || isUserLoading) return null

  if (isError || isUserError) return <div>Error</div>

  return (
    <Stack spacing={1}>
      {data.map((card) => (
        <Tables
          key={card.id}
          content={`${card.brand} ${card.last_digits}`}
          avatar={renderPaymentIcon(card.brand.toLowerCase() as PaymentType)}
          onClick={(event) => {
            event.stopPropagation()
            setTargetCard(card.id)
          }}
          onMouseOver={() => console.log('WWww')}
          action={{
            type: TablesActionType.Menu,
            children: (
              <MenuItem
                onClick={async (event) => {
                  event.stopPropagation()
                  await handleDeleteCreditCard(card.id)
                }}
              >
                delete
              </MenuItem>
            ),
          }}
        />
      ))}
      <Stack pt={3}>
        <Link href="/payment/new" passHref>
          <Button>Add payment method</Button>
        </Link>
      </Stack>
      <Drawer
        open={!!targetCard}
        onClose={() => {
          setTargetCard(null)
          depositMutation.reset()
        }}
        anchor="bottom"
        PaperProps={{ sx: { alignItems: 'center' } }}
      >
        <TopUpDialog
          actionText="Top Up"
          dialogState={depositMutation.status as DialogState}
          onSubmit={handleSubmit((form) =>
            toast.promise(
              depositMutation.mutateAsync({ cardId: targetCard, amount: form.amount * 100 }),
              { loading: 'loading', success: 'top up success', error: 'fail to top up' },
            ),
          )}
        >
          <Typography variant="title2">Specify Amount</Typography>
          <Stack direction="row" alignItems="center" spacing="0.5em">
            <TextField
              {...register('amount', { required: true, pattern: /^\d+$/ })}
              error={!!errors.amount}
              label="Amount"
            />
            <Typography variant="title2">THB</Typography>
          </Stack>
          <Typography variant="regular">
            Current Balance: {stangToBathString(user.coinBalance)} THB
          </Typography>
        </TopUpDialog>
      </Drawer>
    </Stack>
  )
}

SelectPaymentPage.topBarProps = {
  title: 'Choose a payment method',
  action: TopBarActionType.Close,
  onClose: (_, router) => {
    router.back()
  },
}

SelectPaymentPage.shouldAuthenticated = true

export default SelectPaymentPage
