import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { CountrySelect, TopBarActionType } from '@libs/mui'
import { Button, Stack, Switch, TextField, Typography, useTheme } from '@mui/material'
import Link from 'next/link'
import { InferType, boolean, number, object, string } from 'yup'

import { useForm } from 'react-hook-form'
import { FiAlertCircle, FiCreditCard } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons/lib'

const NewCreditCardSchema = object({
  cardNumber: string().required('Card number is required'),
  expiredDate: string().required('Expire date is required'),
  cvv: string().required('CVV is required'),
  country: string().required('Country is required'),
  isMain: boolean(),
})

type NewCreditCardModel = InferType<typeof NewCreditCardSchema>

const AddNewCreditCardPage: ExtendedNextPage = () => {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCreditCardModel>({
    resolver: yupResolver(NewCreditCardSchema),
  })

  const iconProps: IconBaseProps = {
    style: { width: 24, height: 24 },
    color: theme.palette.ink.darkest,
  }

  const getHelperText = (key: keyof NewCreditCardModel) => ({
    error: !!errors[key],
    helperText: errors[key]?.message,
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <Stack spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('cardNumber')}
        label="Card Number"
        placeholder="0000 0000 0000 0000"
        type="number"
        InputProps={{ endAdornment: <FiCreditCard {...iconProps} /> }}
        {...getHelperText('cardNumber')}
        fullWidth
      />
      <Stack direction="row" spacing={2}>
        <TextField
          {...register('expiredDate')}
          label="Expired Date"
          placeholder="MM/YY"
          type="number"
          InputProps={{ endAdornment: <FiAlertCircle {...iconProps} /> }}
          {...getHelperText('expiredDate')}
          fullWidth
        />
        <TextField
          {...register('cvv')}
          label="CVV"
          placeholder="CVV"
          type="number"
          InputProps={{ endAdornment: <FiAlertCircle {...iconProps} /> }}
          {...getHelperText('cvv')}
          fullWidth
        />
      </Stack>
      <CountrySelect register={register('country')} textFieldProps={getHelperText('country')} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="regular" fontWeight={400}>
          Set as Main?
        </Typography>
        <Switch {...register('isMain')} />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Link href="/payment/new" passHref>
          <Button type="submit" variant="outlined" fullWidth>
            Cancel
          </Button>
        </Link>
        <Button type="submit" fullWidth>
          Add Credit Card
        </Button>
      </Stack>
    </Stack>
  )
}

export default AddNewCreditCardPage

AddNewCreditCardPage.topBarProps = {
  title: 'Add new credit card',
  action: TopBarActionType.Back,
}
