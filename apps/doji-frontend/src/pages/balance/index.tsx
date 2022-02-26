import { TopUpDialog, TopUpDialogState } from '@frontend/modules/payment/select'
import { ExtendedNextPage } from '@frontend/type'
import { Button, Card, Drawer, IconButton, Stack, Typography, styled } from '@mui/material'
import { Box, useTheme } from '@mui/system'
import Link from 'next/link'

import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'

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

const MyBalancePage: ExtendedNextPage = () => {
  const theme = useTheme()
  const transactions = [
    { id: '112', value: '$999.99', title: 'How to Turn 10k Into 1k' },
    { id: '112', value: '$999.99', title: 'How to Turn 10k Into 1k' },
    { id: '112', value: '$999.99', title: 'How to Turn 10k Into 1k' },
  ]

  const [withdrawDrawer, setWithdrawDrawer] = useState(false)
  const [withdrawDialogState, setWithdrawDialogState] = useState(TopUpDialogState.IDLE)

  return (
    <Stack spacing="1em">
      <Typography variant="h3" fontWeight={700}>
        My Balance
      </Typography>
      <Box sx={{ px: '1em' }}>
        <WalletCard balance="$50" onClickWithdraw={() => setWithdrawDrawer(true)} />
      </Box>
      <Typography variant="h5" fontWeight={700}>
        Transaction Records
      </Typography>
      <Stack paddingX="1em" spacing="0.75em">
        {transactions.map((t) => (
          <TransactionRecord id={t.id} value={t.value} title={t.title} />
        ))}
      </Stack>
      <Drawer
        open={withdrawDrawer}
        onClose={() => setWithdrawDrawer(false)}
        anchor="bottom"
        PaperProps={{ sx: { alignItems: 'center' } }}
      >
        <TopUpDialog
          dialogState={withdrawDialogState}
          actionText="Withdraw"
          currentBalance="555 THB"
          onSubmit={(e) => setWithdrawDialogState(TopUpDialogState.WAITING)}
        />
      </Drawer>
    </Stack>
  )
}

export default MyBalancePage
