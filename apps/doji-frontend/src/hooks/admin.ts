import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'

export const useAdminAuthGuard = () => {
  const router = useRouter()

  useEffect(() => {
    const storage = new Storage('localStorage')
    if (storage.get(StorageKey.ADMIN_TOKEN) !== 'admin') {
      router.push('/admin/login')
    }
  }, [])

  return null
}
