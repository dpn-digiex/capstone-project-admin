import { getLocalStore } from '@utils/index'
import { create } from 'zustand'

export const useAppStore = create((set) => ({
  accessToken: getLocalStore('accessToken'),
  setAccessToken: (token) => set((state) => ({ ...state, accessToken: token })),

  user: getLocalStore('user') ?? {},
  setUser: (user) => set((state) => ({ ...state, user: { ...state.user, ...user } }))
}))
