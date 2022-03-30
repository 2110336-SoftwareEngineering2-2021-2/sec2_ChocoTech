import { httpClient } from '@frontend/services'
import { IDepositRequest } from '@libs/api'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Omise from 'omise'

import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'

function DepositDialog(props: { open: boolean; onClose: () => void; cards: Omise.Cards.ICard[] }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const queryClient = useQueryClient()

  const depositMutation = useMutation<void, void, IDepositRequest>(
    '/payment/deposit',
    (data) => httpClient.post('/payment/deposit', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('/auth/me')
        queryClient.invalidateQueries('/payment/transaction')
      },
    },
  )

  const onSubmit = (form) => {
    const req: IDepositRequest = {
      amount: parseInt(form.amount) * 100,
      cardId: form.cardId,
    }
    toast
      .promise(depositMutation.mutateAsync(req), {
        success: 'Deposit Succeded',
        loading: 'Depositing',
        error: 'Failed to deposit',
      })
      .then(props.onClose)
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Typography variant="title3" fontWeight={700} textAlign="center">
            Buy Doji Coin
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing="0.5em">
            <Typography color="ink.lighter">1 doji coin = 1 THB</Typography>

            <Typography>Amount (THB)</Typography>
            <TextField
              error={errors.amount}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              {...register('amount', {
                required: true,
                validate: { moreThan20: (v) => parseInt(v) >= 20 },
              })}
            />

            <FormHelperText>Must be integer and no less than 20</FormHelperText>

            <Typography>Payment Method</Typography>

            <Controller
              control={control}
              name="cardId"
              rules={{ required: true }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select fullWidth onChange={onChange} value={value} error={!!error}>
                  {props.cards.map((card) => (
                    <MenuItem key={card.id} value={card.id}>
                      {card.brand} {card.last_digits}
                    </MenuItem>
                  ))}
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

export default DepositDialog
