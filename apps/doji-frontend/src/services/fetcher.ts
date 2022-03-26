import { httpClient } from '@frontend/services'
import { IMeResponseDTO } from '@libs/api'
import { AxiosRequestConfig } from 'axios'

export async function fetchUserInformation(config?: AxiosRequestConfig) {
  const { data } = await httpClient.get<IMeResponseDTO>('/auth/me', config)
  return data
}
