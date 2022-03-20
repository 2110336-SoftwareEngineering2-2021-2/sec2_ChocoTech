import { IMeResponseDTO } from '@libs/api'
import Cookies from 'js-cookie'
import create from 'zustand'

export interface AuthStore {
  isAuthenticated: () => boolean
  userInfo?: IMeResponseDTO
  setUser: (user: IMeResponseDTO) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: () => !!Cookies.get('accessToken'),
  userInfo: undefined,
  setUser: (user) => set((state) => ({ ...state, userInfo: user })),
}))
