import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'

export function WalletCard(props: { balance: string; onClickWithdraw: () => void }) {
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
        <Button fullWidth={true} onClick={props.onClickWithdraw}>
          Withdraw
        </Button>
        <Link href="/payment" passHref>
          <Button fullWidth={true}>Buy Doji Coin</Button>
        </Link>
      </Stack>
    </Stack>
  )
}
