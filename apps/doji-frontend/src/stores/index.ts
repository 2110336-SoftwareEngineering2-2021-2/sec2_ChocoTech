import { MeResponseDTO } from '@libs/api'
import create from 'zustand'

export interface AuthStore {
  isAdmin: boolean
  isAuthenticated: boolean
  userInfo?: MeResponseDTO
  setUser: (user: MeResponseDTO) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isAuthenticated: false,
  userInfo: undefined,
  setUser: (user) =>
    set({
      isAdmin: false, // TODO: implement checking user role
      isAuthenticated: true,
      userInfo: user,
    }),
}))
