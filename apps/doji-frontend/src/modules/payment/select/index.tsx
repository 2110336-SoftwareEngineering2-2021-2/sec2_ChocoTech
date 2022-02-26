import { stangToBathString } from '@frontend/pages/balance'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { IDepositRequest, IErrorMessage, IUser } from '@libs/api'
import { Tables, TopBarActionType } from '@libs/mui'
import {
  AvatarProps,
  Button,
  CircularProgress,
  Drawer,
  Input,
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
import toast from 'react-hot-toast'
import { FaCcMastercard, FaCcVisa, FaCheckCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { IconBaseProps } from 'react-icons/lib'
import { useMutation, useQuery } from 'react-query'

export enum TopUpDialogState {
  IDLE,
  WAITING,
  SUCCESS,
  FAILURE,
}

export function TopUpDialog(props: {
  currentBalance: string
  actionText: string
  onSubmit: (val: number) => void
  dialogState: 'idle' | 'loading' | 'error' | 'success'
  children?: any
}) {
  const theme = useTheme()
  const [inputText, setInputText] = useState('')

  const inputValid = /^[0-9]+$/.test(inputText)

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
    <Stack padding="2em" alignItems="center" spacing="0.5em" maxWidth="sm">
      <Typography variant="h5" fontWeight={700}>
        Specify Amount
      </Typography>

      <Stack direction="row" alignItems="center" spacing="0.5em">
        <TextField
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            style: { ...theme.typography.h4, textAlign: 'right' },
          }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          error={!inputValid && inputText.length > 0}
        />
        <Typography variant="h4" fontWeight={700}>
          THB
        </Typography>
      </Stack>
      {props.children}
      <Typography>Current Balance: {props.currentBalance}</Typography>
      <Button
        fullWidth={true}
        disabled={!inputValid}
        onClick={() => props.onSubmit(parseInt(inputText))}
      >
        {props.actionText}
      </Button>
    </Stack>
  )
}

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

  const [drawer, setDrawer] = useState(false)
  const [targetCard, setTargetCard] = useState<string | null>(null)

  const userQ = useQuery<IUser>('/auth/me', () =>
    httpClient.get('/auth/me').then((res) => res.data),
  )
  const deposit = useMutation<unknown, AxiosError<IErrorMessage>, IDepositRequest>(
    '/payment/deposit',
    (d) => httpClient.post('/payment/deposit', d),
    {
      onSuccess: () => {
        userQ.refetch()
      },
      onError: (e) => {
        toast.error('Fail to deposit: ' + e.response?.data?.message)
      },
    },
  )

  if (isLoading || userQ.isLoading) return null

  if (isError || userQ.isError) return <div>Error</div>

  return (
    <Stack spacing={1}>
      {data.map((card) => (
        <Tables
          key={card.id}
          content={`${card.brand} ${card.last_digits}`}
          avatar={renderPaymentIcon(card.brand.toLowerCase() as PaymentType)}
          onClick={() => {
            setDrawer(true)
            setTargetCard(card.id)
          }}
        />
      ))}
      <Stack pt={3}>
        <Link href="/payment/new" passHref>
          <Button>Add payment method</Button>
        </Link>
      </Stack>
      <Drawer
        open={drawer}
        onClose={() => {
          setDrawer(false)
          deposit.reset()
        }}
        anchor="bottom"
        PaperProps={{ sx: { alignItems: 'center' } }}
      >
        <TopUpDialog
          currentBalance={stangToBathString(userQ.data.coinBalance)}
          actionText="Top Up"
          onSubmit={(v) => {
            deposit.mutate({ amount: v * 100, card: targetCard })
          }}
          dialogState={deposit.status}
        />
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
