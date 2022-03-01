import { WalletCard } from '@frontend/components/WalletCard'
import { TopUpDialog, TopUpDialogState } from '@frontend/modules/payment/select'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { stangToBathString } from '@frontend/utils/stangBathToString'
import {
  IErrorMessage,
  IMeResponseDTO,
  IUser,
  IUserTransactionLineResponseDTO,
  IWithdrawalRequest,
} from '@libs/api'
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
import { useMaybeDeferContent } from 'next/dist/server/render'
import Link from 'next/link'
import { userInfo } from 'os'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BiChevronRight } from 'react-icons/bi'
import { useMutation, useQuery } from 'react-query'

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

const MyBalancePage: ExtendedNextPage = () => {
  const theme = useTheme()

  const [withdrawDrawer, setWithdrawDrawer] = useState(false)

  const { setUser } = useAuthStore()

  const userInfoQuery = useQuery<IMeResponseDTO>('/auth/me', () =>
    httpClient.get('/auth/me').then((res) => res.data),
  )
  const transactionsQuery = useQuery<IUserTransactionLineResponseDTO[]>(
    '/payment/transaction',
    () => httpClient.get('/payment/transaction').then((res) => res.data),
  )
  const withdrawMutation = useMutation<unknown, AxiosError<IErrorMessage>, IWithdrawalRequest>(
    '/payment/withdraw',
    (r) => httpClient.post('/payment/withdraw', r),
    {
      onError: (e) => {
        toast.error(`Fail to withdraw: ${e.response?.data?.message}`)
      },
      onSuccess: () => {
        userInfoQuery.refetch().then((res) => setUser(res.data))
        transactionsQuery.refetch()
      },
    },
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (userInfoQuery.isError || transactionsQuery.isError)
    return <div>'Error ' + (userQ.error || transQ.error)</div>

  if (userInfoQuery.isLoading || transactionsQuery.isLoading) return <CircularProgress />

  return (
    <Stack spacing="1em">
      <Typography variant="title3">My Balance</Typography>
      <Stack px="1em">
        <WalletCard
          balance={stangToBathString(userInfoQuery.data.coinBalance) + ' THB'}
          onClickWithdraw={() => setWithdrawDrawer(true)}
        />
      </Stack>
      <Typography variant="h5" fontWeight={700}>
        Transaction Records
      </Typography>
      <Stack paddingX="1em" spacing="0.75em">
        {transactionsQuery.data.map((t) => (
          <TransactionRecord id={t.id} value={stangToBathString(t.amount)} title={t.description} />
        ))}
      </Stack>
      <Drawer
        open={withdrawDrawer}
        onClose={() => {
          setWithdrawDrawer(false)
          withdrawMutation.reset()
        }}
        anchor="bottom"
        PaperProps={{ sx: { alignItems: 'center' } }}
      >
        <TopUpDialog
          dialogState={withdrawMutation.status}
          actionText="Withdraw"
          onSubmit={handleSubmit((form) =>
            withdrawMutation.mutate({
              amount: form.amount * 100,
              destinationAccount: form.withdrawDestination,
            }),
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
          <TextField
            label="Destination Account"
            {...register('withdrawDestination', { required: true })}
            error={!!errors.withdrawDestination}
          />
          <Typography variant="regular">
            Current Balance: {stangToBathString(userInfoQuery.data.coinBalance)} THB
          </Typography>
        </TopUpDialog>
      </Drawer>
    </Stack>
  )
}

MyBalancePage.shouldAuthenticated = true

export default MyBalancePage
