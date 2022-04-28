import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'

import { IMeResponseDTO } from '@libs/api'

const MyProfilePage = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery<IMeResponseDTO>('/auth/me', () => httpClient.get('/auth/me').then((res) => res.data))

  if (!isUserLoading) {
    console.log(user)
    console.log(user.username)

    const router = useRouter()
    router.push(`/profile/${user.username}`)
  }
  return null
}

export default MyProfilePage
