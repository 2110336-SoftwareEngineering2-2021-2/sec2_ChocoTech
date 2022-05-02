import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'

const LogoutPage: ExtendedNextPage = () => {
  const router = useRouter()
  const setUser = useAuthStore((store) => store.setUser)

  const logoutMutation = useMutation(
    '/auth/logout',
    async () => {
      await httpClient.post('/auth/logout')
    },
    {
      onSuccess: () => {
        setUser(undefined)
        router.push('/login')
      },
    },
  )

  useEffect(() => {
    logoutMutation.mutateAsync()
  }, [])

  return null
}

export default LogoutPage

LogoutPage.dontShowNavBar = true
