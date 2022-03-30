import { getServerSideUser } from '@frontend/common/auth'
import { DialogState, TopUpDialog } from '@frontend/components/TopUpDialog'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage, PaymentType } from '@frontend/type'
import { stangToBathString } from '@frontend/utils/stangBathToString'
import { IDepositRequest, IErrorMessage, IMeResponseDTO, IUser } from '@libs/api'
import { Tables, TablesActionType } from '@libs/mui'
import {
  AvatarProps,
  Button,
  Drawer,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material'
import { AxiosError } from 'axios'
import Link from 'next/link'
import Omise from 'omise'

import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { IconBaseProps } from 'react-icons/lib'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'

const SelectPaymentPanel = () => {
  const theme = useTheme()

  const { data, isLoading, isError } = useQuery<Omise.Cards.ICard[], AxiosError>(
    `/payment/cards`,
    async () => {
      const { data } = await httpClient.get<Omise.Cards.ICard[]>('/payment/cards')
      return data
    },
  )

  const renderPaymentIcon = (type: PaymentType): AvatarProps | undefined => {
    const style: SxProps<Theme> = { background: 'transparent', width: 48, height: 48 }
    const iconProps: IconBaseProps = {
      color: theme.palette.primary.dark,
      style: { width: '100%', height: 30 },
    }
    switch (type) {
      case 'visa':
        return {
          children: <FaCcVisa {...iconProps} />,
          sx: style,
        }
      case 'mastercard':
        return {
          children: <FaCcMastercard {...iconProps} />,
          sx: style,
        }
      default:
        return undefined
    }
  }

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<IMeResponseDTO>('/auth/me', () => httpClient.get('/auth/me').then((res) => res.data))

  const queryClient = useQueryClient()
  const deleteCreditCardMutation = useMutation<void, AxiosError<IErrorMessage>, { cardId: string }>(
    `/payment/cards`,
    (data) => httpClient.delete(`/payment/cards/${data.cardId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`/payment/cards`)
      },
    },
  )

  const handleDeleteCreditCard = async (targetCardId: string) => {
    toast
      .promise(deleteCreditCardMutation.mutateAsync({ cardId: targetCardId }), {
        loading: 'loading',
        success: 'delete success',
        error: 'fail to delete card',
      })
      .catch((e) =>
        toast.error(e?.response?.data?.message || e?.message || 'Error during deletion'),
      )
  }
  if (isLoading || isUserLoading) return null

  if (isError || isUserError) return <div>Error</div>

  return (
    <Stack spacing={1}>
      {data.map((card) => (
        <Tables
          key={card.id}
          content={`${card.brand} ${card.last_digits}`}
          avatar={renderPaymentIcon(card.brand.toLowerCase() as PaymentType)}
          onClick={(event) => {
            event.stopPropagation()
          }}
          onMouseOver={() => console.log('WWww')}
          action={{
            type: TablesActionType.Menu,
            children: (
              <MenuItem
                onClick={async (event) => {
                  event.stopPropagation()
                  await handleDeleteCreditCard(card.id)
                }}
              >
                delete
              </MenuItem>
            ),
          }}
        />
      ))}
    </Stack>
  )
}

export default SelectPaymentPanel
