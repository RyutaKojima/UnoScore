import { IRound } from '../interfaces/round'
import { useEffect, useState } from 'react'
import { roundsRef } from '../plugins/firebase'

type IRounds = IRound[]

export const useRounds = (): [IRounds, (rounds: IRounds) => void] => {
  const [rounds, setRounds] = useState<IRounds>([])

  useEffect(() => {
    roundsRef.on('value', (snapshot) => {
      setRounds(snapshot.val() ?? [])
    })
  }, [])

  const updateDatabase = async (newRounds: IRounds) => {
    await roundsRef.set(newRounds)
  }

  return [rounds, updateDatabase]
}
