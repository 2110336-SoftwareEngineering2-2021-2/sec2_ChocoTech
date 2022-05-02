import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthStore } from '@frontend/stores'

const MyProfilePage = () => {
  const user = useAuthStore((store) => store.user)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/profile/${user.username}`)
    }
  }, [user])

  return null
}

export default MyProfilePage
