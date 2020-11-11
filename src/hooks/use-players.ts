import { playersRef } from '../plugins/firebase'
import { useEffect, useState } from 'react'

type IPlayers = string[]

export const usePlayers = (): [IPlayers, (players: IPlayers) => void] => {
  const [players, setPlayers] = useState<IPlayers>([])

  useEffect(() => {
    playersRef.on('value', (snapshot) => {
      setPlayers(snapshot.val() ?? [])
    })
  }, [])

  const updateDatabase = async (newPlayers: IPlayers) => {
    await playersRef.set(newPlayers)
  }

  return [players, updateDatabase]
}
