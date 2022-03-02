import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { stangToBathString } from '@frontend/utils/stangBathToString'
import { IDepositRequest, IErrorMessage, IMeResponseDTO, IUser } from '@libs/api'
import { Tables, TablesActionType, TopBarActionType } from '@libs/mui'
import {
  AvatarProps,
  Button,
  CircularProgress,
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

import { FormEventHandler, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCcMastercard, FaCcVisa, FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { IconBaseProps } from 'react-icons/lib'
import { useMutation, useQuery } from 'react-query'

export enum TopUpDialogState {
  IDLE = 'idle',
  WAITING = 'waiting',
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export function TopUpDialog(props: {
  actionText: string
  dialogState: 'idle' | 'loading' | 'error' | 'success'
  children?: any
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  const theme = useTheme()

  const statusContent = new Map([
    ['loading', <CircularProgress size="5em" />],
    ['error', <ImCross fontSize="5em" color={theme.palette.primary.main} />],
    ['success', <FaCheckCircle fontSize="5em" color={theme.palette.primary.main} />],
  ])

  if (statusContent.has(props.dialogState)) {
    return (
      <Stack padding="2em" alignItems="center" spacing="0.5em" maxWidth="sm">
        {statusContent.get(props.dialogState)}
      </Stack>
    )
  }

  return (
    <form onSubmit={props.onSubmit}>
      <Stack padding="2em" alignItems="center" spacing="1em" maxWidth="sm">
        {props.children}
        <Button fullWidth={true} type="submit">
          {props.actionText}
        </Button>
      </Stack>
    </form>
  )
}

const SelectPaymentPage: ExtendedNextPage = () => {
  const theme = useTheme()
  const { userInfo, setUser } = useAuthStore()
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

  const userInfoQuery = useQuery<IMeResponseDTO>('/auth/me', () =>
    httpClient.get('/auth/me').then((res) => res.data),
  )

  const depositMutation = useMutation<unknown, AxiosError<IErrorMessage>, IDepositRequest>(
    `/payment/deposit/${userInfo.username}`,
    (d) => httpClient.post('/payment/deposit', d),
    {
      onSuccess: () => {
        userInfoQuery.refetch().then((res) => setUser(res.data))
      },
      onError: (e) => {
        toast.error('Fail to deposit')
      },
    },
  )
  const deleteCreditCardMutation = useMutation<void, AxiosError<IErrorMessage>, { cardId: string }>(
    `/payment/cards`,
    (data) => httpClient.delete(`/payment/cards/${data.cardId}`),
    {
      onSuccess: () => {
        userInfoQuery.refetch().then((res) => setUser(res.data))
      },
    },
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

  if (isLoading || userInfoQuery.isLoading) return null

  if (isError || userInfoQuery.isError) return <div>Error</div>

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
          dialogState={depositMutation.status}
          onSubmit={handleSubmit((form) =>
            depositMutation.mutate({ cardId: targetCard, amount: form.amount * 100 }),
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
            Current Balance: {stangToBathString(userInfoQuery.data.coinBalance)} THB
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
