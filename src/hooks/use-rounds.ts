import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../store'
import { gameSlice } from '../store/game'
import { IRound } from '../interfaces/round'

export const useRounds = (): [IRound[], (rounds: IRound[]) => void] => {
  const rounds = useSelector((state: RootStateType) => state.game.rounds)

  const dispatch = useDispatch()
  const setRounds = (rounds: IRound[]) =>
    dispatch(gameSlice.actions.setRounds(rounds))

  return [rounds, setRounds]
}
