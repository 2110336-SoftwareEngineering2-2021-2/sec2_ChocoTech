import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { IMeResponseDTO } from '@libs/api'
import create from 'zustand'

const localStorage = new Storage('localStorage')

export interface AuthStore {
  isAuthenticated: () => boolean
  userInfo?: IMeResponseDTO
  setUser: (user: IMeResponseDTO) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: () => !!localStorage.get<string>(StorageKey.TOKEN),
  userInfo: undefined,
  setUser: (user) => set((state) => ({ ...state, userInfo: user })),
}))
