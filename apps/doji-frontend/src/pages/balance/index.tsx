import { TopUpDialog, TopUpDialogState } from '@frontend/modules/payment/select'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { IErrorMessage, IUser, IUserTransactionLineResponse, IWithdrawalRequest } from '@libs/api'
import {
  Button,
  Card,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { Box, useTheme } from '@mui/system'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { userInfo } from 'os'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import { useMutation, useQuery } from 'react-query'

function WalletCard(props: { balance: string; onClickWithdraw: () => void }) {
  const theme = useTheme()
  const [showButton, setShowButton] = useState(false)

  const ValueBox = (
    <Box padding="1em">
      <Typography variant="h4" fontWeight={700}>
        Doji Wallet
      </Typography>
      <Typography color={theme.palette.primary.dark}>{props.balance}</Typography>
    </Box>
  )

  if (!showButton)
    return (
      <Card>
        <Stack>
          {ValueBox}
          <Button
            sx={{ borderRadius: 0, justifyContent: 'space-between' }}
            endIcon={<BiChevronRight />}
            onClick={() => setShowButton(true)}
          >
            Exchange
          </Button>
        </Stack>
      </Card>
    )
  return (
    <Stack>
      {ValueBox}
      <Stack direction="row" paddingX="1em" spacing="1em">
        <Button fullWidth={true} variant="outlined" onClick={props.onClickWithdraw}>
          Withdraw
        </Button>
        <Link href="/payment">
          <Button fullWidth={true}>Buy Doji Coin</Button>
        </Link>
      </Stack>
    </Stack>
  )
}

function TransactionRecord(props: { id: string; value: string; title: string }) {
  const theme = useTheme()

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography>{props.title}</Typography>
          <Typography color={theme.palette.ink.light}>Transaction ID: {props.id}</Typography>
        </Stack>
        <Typography>{props.value}</Typography>
      </Stack>
    </Box>
  )
}

export function stangToBathString(amount: number) {
  const sign = amount < 0
  if (sign) amount = -amount

  const whole = Math.floor(amount / 100)
  const partial = String(amount % 100).padStart(2, '0')

  return `${sign ? '-' : ''}${whole}.${partial}`
}

const MyBalancePage: ExtendedNextPage = () => {
  const theme = useTheme()

  const [withdrawDrawer, setWithdrawDrawer] = useState(false)
  const [withdrawDestination, setWithdrawDestination] = useState<string>('')

  const userQ = useQuery<IUser>('/auth/me', () =>
    httpClient.get('/auth/me').then((res) => res.data),
  )
  const transQ = useQuery<IUserTransactionLineResponse[]>('/payment/transaction', () =>
    httpClient.get('/payment/transaction').then((res) => res.data),
  )
  const withdrawM = useMutation<unknown, AxiosError<IErrorMessage>, IWithdrawalRequest>(
    '/payment/withdraw',
    (r) => httpClient.post('/payment/withdraw', r),
    {
      onError: (e) => {
        toast.error(`Fail to withdraw: ${e.response?.data?.message}`)
      },
    },
  )

  if (userQ.isError || transQ.isError) return 'Error ' + (userQ.error || transQ.error)

  if (userQ.isLoading || transQ.isLoading) return <CircularProgress />

  return (
    <Stack spacing="1em">
      <Typography variant="h3" fontWeight={700}>
        My Balance
      </Typography>
      <Box sx={{ px: '1em' }}>
        <WalletCard
          balance={stangToBathString(userQ.data.coinBalance) + ' THB'}
          onClickWithdraw={() => setWithdrawDrawer(true)}
        />
      </Box>
      <Typography variant="h5" fontWeight={700}>
        Transaction Records
      </Typography>
      <Stack paddingX="1em" spacing="0.75em">
        {transQ.data.map((t) => (
          <TransactionRecord id={t.id} value={stangToBathString(t.amount)} title={t.description} />
        ))}
      </Stack>
      <Drawer
        open={withdrawDrawer}
        onClose={() => {
          setWithdrawDrawer(false)
          withdrawM.reset()
          transQ.refetch()
        }}
        anchor="bottom"
        PaperProps={{ sx: { alignItems: 'center' } }}
      >
        <TopUpDialog
          dialogState={withdrawM.status}
          actionText="Withdraw"
          currentBalance={`${stangToBathString(userQ.data.coinBalance)} THB`}
          onSubmit={(v) =>
            withdrawM.mutate({ amount: v * 100, destinationAccount: withdrawDestination })
          }
        >
          <TextField
            label="Destination Account"
            value={withdrawDestination}
            onChange={(e) => setWithdrawDestination(e.target.value)}
          />
        </TopUpDialog>
      </Drawer>
    </Stack>
  )
}

MyBalancePage.shouldAuthenticated = true

export default MyBalancePage
