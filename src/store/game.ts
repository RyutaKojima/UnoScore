import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGame } from '../interfaces/game'

const initialState: IGame = {
  rounds: [],
  players: [],
  option: {
    rescueSecond: true,
    rescueThird: false,
    magnification: 1,
  },
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setRounds: (state, action: PayloadAction<IGame['rounds']>) => {
      return { ...state, rounds: action.payload }
    },
    setPlayers: (state, action: PayloadAction<IGame['players']>) => {
      return { ...state, players: action.payload }
    },
    setOption: (state, action: PayloadAction<IGame['option']>) => {
      return { ...state, option: action.payload }
    },
  },
})
