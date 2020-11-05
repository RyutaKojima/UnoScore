import { useState } from 'react'

export const usePlayers = () => {
  return useState<string[]>([])
}
