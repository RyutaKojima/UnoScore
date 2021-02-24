import { IMagnification } from '../interfaces/magnification'

export const MAGNIFICATIONS: Record<
  string,
  {
    label: string
    value: IMagnification
  }
> = {
  single: {
    label: 'x1',
    value: 1,
  },
  double: {
    label: 'x2',
    value: 2,
  },
  triple: {
    label: 'x3',
    value: 3,
  },
  quadruple: {
    label: 'x4',
    value: 4,
  },
  quintuple: {
    label: 'x5',
    value: 5,
  },
  random: {
    label: 'ランダム',
    value: 'random',
  },
}
