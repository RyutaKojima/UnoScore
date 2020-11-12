import { HomePage } from '../components/HomePage'
import { useRounds } from '../hooks/use-rounds'
import { usePlayers } from '../hooks/use-players'
import { useOption } from '../hooks/use-option'
import { initializeDatabase } from '../plugins/firebase'

export const HomeContainer = () => {
  const { rounds, addRound, setScore } = useRounds()
  const [players, setPlayers] = usePlayers()
  const [option, setOption] = useOption()

  return (
    <HomePage
      {...{
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
