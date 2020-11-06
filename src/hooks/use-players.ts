import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../store'
import { gameSlice } from '../store/game'

export const usePlayers = (): [string[], (players: string[]) => void] => {
  const players = useSelector((state: RootStateType) => state.game.players)

  const dispatch = useDispatch()
  const setPlayers = (players: string[]) =>
    dispatch(gameSlice.actions.setPlayers(players))

  return [players, setPlayers]
}
