import create from 'zustand'

import { IMeResponseDTO } from '@libs/api'

export interface AuthStore {
  user?: IMeResponseDTO
  setUser: (user: IMeResponseDTO) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set((state) => ({ ...state, user })),
}))

export interface AdminAuthStore {
  admin: boolean
  setAdmin: (admin: boolean) => void
}

export const useAdminAuthStore = create<AdminAuthStore>((set) => ({
  admin: undefined,
  setAdmin: (admin) => set((state) => ({ ...state, admin })),
}))
