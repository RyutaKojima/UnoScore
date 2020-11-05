import { useState } from 'react'
import { IOption } from '../interfaces/option'

export const useOption = () => {
  return useState<IOption>({
    rescueSecond: true,
    rescueThird: false,
    magnification: 1,
  })
}
