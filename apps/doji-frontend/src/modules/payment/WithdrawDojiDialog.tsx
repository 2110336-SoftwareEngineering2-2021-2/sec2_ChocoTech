import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

import { httpClient } from '@frontend/services'

import { IWithdrawalRequest } from '@libs/api'

function WithdrawDojiDialog(props: { open: boolean; onClose: () => void }) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const withdrawMutation = useMutation<void, void, IWithdrawalRequest>(
    '/payment/withdraw',
    (req) => httpClient.post('/payment/withdraw', req),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/auth/me')
        queryClient.invalidateQueries('/payment/transaction')
      },
    },
  )

  const queryClient = useQueryClient()

  const onSubmit = (form: { amount: string; destinationAccount: string }) => {
    toast
      .promise(
        withdrawMutation.mutateAsync({
          amount: parseInt(form.amount) * 100,
          destinationAccount: form.destinationAccount,
        }),
        {
          loading: 'Withdrawing',
          success: 'Withdrawal Completed',
          error: 'Failed to withdraw',
        },
      )
      .then(props.onClose)
      .catch((e) =>
        toast.error(e?.response?.data?.message || e?.message || 'Error during withdrawal request'),
      )
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Typography variant="title3" fontWeight={700} textAlign="center">
            Withdraw Doji Coin
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing="0.5em">
            <Typography color="ink.lighter">1 doji coin = 1 THB</Typography>

            <Typography>Amount (Doji Coin)</Typography>
            <TextField
              error={errors.amount}
              {...register('amount', {
                required: true,
                validate: { moreThan0: (v) => parseInt(v) >= 0 },
              })}
            />

            <Typography>Destination Account</Typography>
            <TextField
              {...register('destinationAccount', { required: true })}
              error={errors.destinationAccount}
            />
            <Typography>Payment Method</Typography>

            <Controller
              control={control}
              name="bank"
              rules={{ required: true }}
              defaultValue="kbank"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select fullWidth onChange={onChange} value={value} error={!!error}>
                  <MenuItem value="kbank">KBank</MenuItem>
                </Select>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack width="100%" padding="1em" spacing="0.5em">
            <Button fullWidth type="submit">
              Confirm
            </Button>
            <Button fullWidth variant="outlined" onClick={props.onClose}>
              No Thanks
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default WithdrawDojiDialog
