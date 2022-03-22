import axios from 'axios'
import type { Omise } from 'omise-js-typed'

import toast from 'react-hot-toast'
import { QueryClient } from 'react-query'

export const queryClient = new QueryClient()

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
})

httpClient.interceptors.response.use((response) => {
  if (response.status === 401) {
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
