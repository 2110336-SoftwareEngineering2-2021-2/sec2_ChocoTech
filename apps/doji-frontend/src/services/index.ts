import axios, { AxiosError } from 'axios'
import type { Omise } from 'omise-js-typed'
import { QueryClient } from 'react-query'

export const httpClient = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true,
})

httpClient.interceptors.request.use((request) => {
  return request
})

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log('Token expired or invalid')
      // window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export const createOmiseClient = (): Omise | undefined => {
  if (typeof window !== 'undefined') {
    const omise = window.Omise
    omise.setPublicKey(process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY)
    return omise
  }
}

export const queryClient = new QueryClient()
