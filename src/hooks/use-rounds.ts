import { IRound } from '../interfaces/round'
import { useEffect, useState } from 'react'
import { roundsRef } from '../plugins/firebase'
import { deepCopy, filledArray } from '../utils/utils'
import { useSetRecoilState } from 'recoil'
import { appLoadingsState } from '../store/app'

type IRounds = IRound[]

export const useRounds = (): {
  rounds: IRounds
  addRound: (numberOfPlayers: number) => void
  setScore: (roundIndex: number, playerIndex: number, score: number) => void
} => {
  const [rounds, setRounds] = useState<IRounds>([])
  const setAppLoadings = useSetRecoilState(appLoadingsState)

  useEffect(() => {
    roundsRef.on('value', (snapshot) => {
      setAppLoadings((prev) => ({ ...prev, rounds: false }))
      setRounds(snapshot.val() ? Object.values(snapshot.val()) : [])
    })
  }, [])

  return {
    rounds,
    setScore: async (
      roundIndex: number,
      playerIndex: number,
      score: number
    ) => {
      await roundsRef.child(`${roundIndex}/${playerIndex}`).set(score)
    },
    addRound: async (numberOfPlayers: number) => {
      await roundsRef.transaction((currentRounds) => {
        const newRounds = currentRounds === null ? [] : deepCopy(currentRounds)
        newRounds.push(filledArray<number>(numberOfPlayers, 0))
        return newRounds
      })
    },
  }
}
