import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { fetchUserInformation } from '@frontend/services/fetcher'

const MyProfilePage = ({ user }) => {
  const { data: userData } = useQuery('user', fetchUserInformation, { initialData: user })
  const currentUser = userData

  const router = useRouter()
  router.push(`/profile/${currentUser.username}`)

  return null
}

export default MyProfilePage
