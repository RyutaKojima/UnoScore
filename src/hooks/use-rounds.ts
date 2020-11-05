import { useState } from 'react'
import { IRound } from '../interfaces/round'

export const useRounds = () => {
  return useState<IRound[]>([])
}
