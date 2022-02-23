import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import axios from 'axios'

import toast from 'react-hot-toast'
import { QueryClient } from 'react-query'

export const queryClient = new QueryClient()

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

httpClient.interceptors.request.use((request) => {
  const token = new Storage('localStorage').get(StorageKey.TOKEN)
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})

httpClient.interceptors.response.use((response) => {
  if (response.status === 401) {
    new Storage('localStorage').remove(StorageKey.TOKEN)
    toast.error('Your session has expired. Please log in again.')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  }
  return response
})
