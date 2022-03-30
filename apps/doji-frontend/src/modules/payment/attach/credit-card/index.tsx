import { getServerSideUser } from '@frontend/common/auth'
import { createOmiseClient, httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { IAttachCardRequestDTO, IMeResponseDTO } from '@libs/api'
import { CountrySelect } from '@libs/mui'
import { Button, Stack, Switch, TextField, Typography, useTheme } from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { InferType, boolean, object, string } from 'yup'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiAlertCircle, FiCreditCard } from 'react-icons/fi'
import { IconBaseProps } from 'react-icons/lib'
import { useMutation, useQueryClient } from 'react-query'
import MaskedInput from 'react-text-mask'

import { CARD_NUMBER_MASK, CVV_MASK, EXPIRED_DATE_MASK } from './constants'

const NewCreditCardSchema = object({
  cardNumber: string().required('Card number is required'),
  expiredDate: string().required('Expire date is required'),
  cvv: string().required('CVV is required'),
  country: string().required('Country is required'),
  isDefault: boolean(),
})

type NewCreditCardModel = InferType<typeof NewCreditCardSchema>

function AddNewCreditCardPage(props: { user: IMeResponseDTO }) {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCreditCardModel>({
    resolver: yupResolver(NewCreditCardSchema),
    defaultValues: {
      isDefault: true,
      country: 'Thailand',
    },
  })

  const attachCreditCardMutation = useMutation<void, AxiosError, IAttachCardRequestDTO>(
    async (data) => {
      await httpClient.post<void, void, IAttachCardRequestDTO>('/payment/cards', data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/payment/cards`)
      },
    },
  )

  const queryClient = useQueryClient()

  const createTokenMutation = useMutation<void, AxiosError, NewCreditCardModel>(
    async (data: NewCreditCardModel) => {
      const omise = createOmiseClient()
      await omise.createToken(
        'card',
        {
          name: `${props.user.firstName} ${props.user.lastName}`,
          number: data.cardNumber.split('-').join(''),
          expiration_month: parseInt(data.expiredDate.split('/')[0]),
          expiration_year: parseInt(data.expiredDate.split('/')[1]),
          security_code: parseInt(data.cvv),
        },
        async (_, response) => {
          toast.promise(
            attachCreditCardMutation.mutateAsync({
              cardToken: response.id,
              isDefault: !!data.isDefault,
            }),
            {
              loading: 'Attaching card...',
              success: 'Successfully attached new credit card',
              error: 'Failed to attach new credit card',
            },
          )
        },
      )
    },
  )

  const iconProps: IconBaseProps = {
    style: { width: 24, height: 24 },
    color: theme.palette.ink.darkest,
  }

  const maskedInputProps = {
    placeholderChar: '\u2000',
    guide: false,
    keepCharPositions: false,
  }

  const getHelperText = (key: keyof NewCreditCardModel) => ({
    error: !!errors[key],
    helperText: errors[key]?.message,
  })

  const router = useRouter()

  const onSubmit = async (data: NewCreditCardModel) => {
    await createTokenMutation.mutateAsync(data)
    router.push('/balance')
  }

  return (
    <Stack spacing={3} component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('cardNumber')}
        label="Card Number"
        placeholder="0000-0000-0000-0000"
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputComponent: (props) => (
            <MaskedInput mask={CARD_NUMBER_MASK} {...props} {...maskedInputProps} />
          ),
          endAdornment: <FiCreditCard {...iconProps} />,
        }}
        fullWidth
        {...getHelperText('cardNumber')}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          {...register('expiredDate')}
          label="Expired Date"
          placeholder="MM/YY"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: (props) => (
              <MaskedInput mask={EXPIRED_DATE_MASK} {...props} {...maskedInputProps} />
            ),
            endAdornment: <FiAlertCircle {...iconProps} />,
          }}
          {...getHelperText('expiredDate')}
          fullWidth
        />
        <TextField
          {...register('cvv')}
          label="CVV"
          placeholder="CVV"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputComponent: (props) => (
              <MaskedInput mask={CVV_MASK} {...props} {...maskedInputProps} />
            ),
            endAdornment: <FiAlertCircle {...iconProps} />,
          }}
          {...getHelperText('cvv')}
          fullWidth
        />
      </Stack>
      <CountrySelect register={register('country')} textFieldProps={getHelperText('country')} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="regular" fontWeight={400}>
          Set as Main?
        </Typography>
        <Switch {...register('isDefault')} defaultChecked />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button type="submit" variant="outlined" fullWidth onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" fullWidth>
          Add Credit Card
        </Button>
      </Stack>
    </Stack>
  )
}

export const getServerSideProps = getServerSideUser()

export default AddNewCreditCardPage
