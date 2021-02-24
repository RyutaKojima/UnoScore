import { playersRef } from '../plugins/firebase'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { appLoadingsState } from '../store/app'

type IPlayers = string[]

export const usePlayers = (): [IPlayers, (players: IPlayers) => void] => {
  const [players, setPlayers] = useState<IPlayers>([])
  const setAppLoadings = useSetRecoilState(appLoadingsState)

  useEffect(() => {
    playersRef.on('value', (snapshot) => {
      setAppLoadings((prev) => ({ ...prev, players: false }))
      setPlayers(snapshot.val() ?? [])
    })
  }, [])

  const updateDatabase = async (newPlayers: IPlayers) => {
    await playersRef.set(newPlayers)
  }

  return [players, updateDatabase]
}
