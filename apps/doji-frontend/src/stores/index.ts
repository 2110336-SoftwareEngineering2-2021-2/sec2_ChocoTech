import { IMeResponseDTO } from '@libs/api'
import create from 'zustand'

export interface AuthStore {
  user?: IMeResponseDTO
  setUser: (user: IMeResponseDTO) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set((state) => ({ ...state, user })),
}))
