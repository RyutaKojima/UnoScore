import { IOption } from './option'
import { IRound } from './round'

export type IGame = {
  players: string[]
  rounds: IRound[]
  option: IOption
}
