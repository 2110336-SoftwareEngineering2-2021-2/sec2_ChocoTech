import { Stack, Typography } from '@mui/material'
import { intlFormat } from 'date-fns'

import { stangToBathString } from '@frontend/utils/stangBathToString'

import { IUserTransactionLineResponseDTO } from '@libs/api'

function TransactionEntry(props: { data: IUserTransactionLineResponseDTO }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack>
        <Typography fontWeight={400}>{props.data.description}</Typography>
        <Typography variant="small" fontWeight={400} color="ink.lighter">
          {intlFormat(new Date(props.data.timestamp), {
            second: 'numeric',
            minute: 'numeric',
            hour: 'numeric',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      </Stack>

      <Typography color={props.data.amount > 0 ? 'primary' : 'red.main'} fontWeight={500}>
        {props.data.amount > 0 ? '+' : ''}
        {stangToBathString(props.data.amount)}
      </Typography>
    </Stack>
  )
}

export default TransactionEntry
