import { IOption } from '../interfaces/option'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../store'
import { gameSlice } from '../store/game'

export const useOption = (): [IOption, (option: IOption) => void] => {
  const option = useSelector((state: RootStateType) => state.game.option)

  const dispatch = useDispatch()
  const setOption = (option: IOption) =>
    dispatch(gameSlice.actions.setOption(option))

  return [option, setOption]
}
