import { httpClient } from '@frontend/services'
import { IMeResponseDTO } from '@libs/api'

export async function fetchUserInformation() {
  const { data } = await httpClient.get<IMeResponseDTO>('/auth/me')
  return data
}
