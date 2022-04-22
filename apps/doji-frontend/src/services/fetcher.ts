import { AxiosRequestConfig } from 'axios'

import { httpClient } from '@frontend/services'

import { IMeResponseDTO } from '@libs/api'

export async function fetchUserInformation(config?: AxiosRequestConfig) {
  const { data } = await httpClient.get<IMeResponseDTO>('/auth/me', config)
  return data
}
