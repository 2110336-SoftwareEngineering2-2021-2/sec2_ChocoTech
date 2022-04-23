import { AxiosRequestConfig } from 'axios'

import { httpClient } from '@frontend/services'

import { IMeResponseDTO } from '@libs/api'

export async function fetchUserInformation(config?: AxiosRequestConfig) {
  const { data } = await httpClient.get<IMeResponseDTO>(
    process.env.NEXT_PUBLIC_API_URL + '/auth/me',
    config,
  )
  return data
}
