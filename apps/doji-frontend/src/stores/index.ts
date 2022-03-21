import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { IMeResponseDTO } from '@libs/api'
import Cookies from 'js-cookie'
import create from 'zustand'

const localStorage = new Storage('localStorage')

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
