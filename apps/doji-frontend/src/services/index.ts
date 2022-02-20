import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

httpClient.interceptors.request.use((request) => {
  const token = new Storage('localStorage').get(StorageKey.TOKEN)
  if (token) {
    console.log('Add Header Authorization')
    request.headers.Authorization = `Bearer ${token}`
  }
  return request
})
