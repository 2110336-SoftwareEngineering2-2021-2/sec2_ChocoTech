import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import type { Omise } from 'omise-js-typed'

import toast from 'react-hot-toast'

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
})

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333/api',
  timeout: 10000,
  withCredentials: true,
  adapter: cache.adapter,
})

httpClient.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.log('Token expiredor invalid')
    toast.error('Your session has expired. Please log in again.')
    setTimeout(() => {
      window.location.href = '/login'
    }, 1500)
  }
  return response
})

export const createOmiseClient = (): Omise | undefined => {
  if (typeof window !== 'undefined') {
    const omise = window.Omise
    omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY)
    return omise
  }
}
