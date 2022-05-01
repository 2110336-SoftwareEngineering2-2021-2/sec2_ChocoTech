import { Button, Card, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import Omise from 'omise'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import DepositDialog from '@frontend/modules/payment/DepositDialog'
import TransactionEntry from '@frontend/modules/payment/TransactionEntry'
import WithdrawDojiDialog from '@frontend/modules/payment/WithdrawDojiDialog'
import SelectPaymentPanel from '@frontend/modules/payment/select'
import { httpClient } from '@frontend/services'
import { stangToBathString } from '@frontend/utils/stangBathToString'

import { IMeResponseDTO, IUserTransactionLineResponseDTO } from '@libs/api'

function BalancePage() {
  const meQuery = useQuery<IMeResponseDTO>('/auth/me', () =>
    httpClient.get('/auth/me').then((res) => res.data),
  )
  const transactionsQuery = useQuery<IUserTransactionLineResponseDTO[]>(
    '/payment/transaction',
    () => httpClient.get('/payment/transaction').then((res) => res.data),
  )
  const cardsQuery = useQuery<Omise.Cards.ICard[]>('/payment/cards', () =>
    httpClient.get('/payment/cards').then((res) => res.data),
  )

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)

  const loading = meQuery.isLoading || transactionsQuery.isLoading || cardsQuery.isLoading
  const error = meQuery.error || transactionsQuery.error || cardsQuery.error

  if (error) return <p>Error: {JSON.stringify(error)}</p>

  if (loading) return <CircularProgress />

  return (
    <Stack spacing="2em" mt="1em" px="1em">
      <Typography variant="title3">Wallet</Typography>

      <Card>
        <Stack p="1.5em" spacing="0.5em">
          <Typography variant="tiny" color="sky.main" fontWeight={500}>
            Doji Coin
          </Typography>
          <Typography variant="title3" color="primary.dark">
            {stangToBathString(meQuery.data.coinBalance)} THB
          </Typography>
        </Stack>
      </Card>

      <Stack direction="row" spacing="1.5em">
        <Button fullWidth variant="outlined" onClick={() => setWithdrawDialogOpen(true)}>
          Withdraw
        </Button>
        <Button fullWidth onClick={() => setDepositDialogOpen(true)}>
          Buy
        </Button>
      </Stack>

      <Typography variant="large" fontWeight={500}>
        Payment method
        <Link href="/balance/new">
          <IconButton color="primary">
            <AiOutlinePlus size="1em" />
          </IconButton>
        </Link>
      </Typography>

      <SelectPaymentPanel />

      <Typography variant="large" fontWeight={500}>
        Transaction Record
      </Typography>

      <Stack spacing="1em">
        {transactionsQuery.data.map((entry) => (
          <TransactionEntry key={entry.id} data={entry} />
        ))}
        {transactionsQuery.data.length == 0 && (
          <Typography color="ink.main">There is no transaction to be shown.</Typography>
        )}
      </Stack>

      <DepositDialog
        open={depositDialogOpen}
        onClose={() => setDepositDialogOpen(false)}
        cards={cardsQuery.data}
      />
      <WithdrawDojiDialog open={withdrawDialogOpen} onClose={() => setWithdrawDialogOpen(false)} />
    </Stack>
  )
}

export const getServerSideProps = getServerSideUser()

export default BalancePage
