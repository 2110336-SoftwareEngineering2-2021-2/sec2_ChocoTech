import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IExpertApplicationListItemDTO } from '@libs/api'
import { SearchBar, Tables, TablesActionType } from '@libs/mui'
import { Stack, Typography } from '@mui/material'
import { GetServerSideProps } from 'next/types'
import * as yup from 'yup'

import { useState } from 'react'
import { Control, useForm, useWatch } from 'react-hook-form'
import { useQuery } from 'react-query'

interface IExpertCardProp {
  fullname: string
  username: string
}
function ExpertCard(props: IExpertCardProp) {
  return (
    <Tables
      action={{
        children: 'detail',
        type: TablesActionType.Button,
      }}
      avatar={{
        alt: 'Robert William',
        children: 'TY',
        src: 'https://mui.com/static/images/avatar/1.jpg',
        sx: {
          bgcolor: 'primary.main',
        },
      }}
      content={props.fullname}
    />
  )
}
function ExpertResult({ control }: { control: Control }) {
  const query = useWatch({ control })
  return <Stack>{query.keyword}</Stack>
}

function ExpertRequest() {
  const { data, isLoading } = useQuery<IExpertApplicationListItemDTO[]>(
    ['getApplications'],
    async () => {
      const { data } = await httpClient.get(`/expert/applications/`)
      return data
    },
  )
  const { register, control } = useForm()
  if (isLoading) {
    return null
  }
  return (
    <Stack>
      <br />
      <Typography fontWeight={700} variant="h4">
        Expert Requests
      </Typography>
      <br />
      <form>
        <SearchBar {...register('keyword')} />
      </form>
      <br />
      <ExpertResult control={control} />
    </Stack>
  )
}

export default ExpertRequest
