import { HomePage } from '../components/HomePage'
import { useRounds } from '../hooks/use-rounds'
import { usePlayers } from '../hooks/use-players'
import { useOption } from '../hooks/use-option'
import { initializeDatabase } from '../plugins/firebase'
import { useRecoilValue } from 'recoil'
import { isLoadingState } from '../store/app'
import React from 'react'

export const HomeContainer: React.FC = () => {
  const loading = useRecoilValue(isLoadingState)
  const { rounds, addRound, setScore } = useRounds()
  const [players, setPlayers] = usePlayers()
  const [option, setOption] = useOption()

  return (
    <HomePage
      {...{
        loading,
        rounds,
        addRound,
        setScore,
        players,
        setPlayers,
        option,
        setOption,
        initializeDatabase,
      }}
    />
  )
}
