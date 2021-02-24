import { atom, selector } from 'recoil'

export const appLoadingsState = atom({
  key: 'appLoadingsState',
  default: {
    option: true,
    players: true,
    rounds: true,
  },
})

export const isLoadingState = selector<boolean>({
  key: 'isLoadingState',
  get: ({ get }) => {
    const loadings = get(appLoadingsState)
    return Object.values(loadings).some((v) => v)
  },
})
