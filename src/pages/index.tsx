import React, { ChangeEvent, ComponentProps, useState } from 'react'
import { ScoreTable } from '../components/ScoreTable'
import { deepCopy, filledArray } from '../utils/utils'
import { UserAppendForm } from '../components/UserAppendForm'
import { ResultTable } from '../components/ResultTable'
import { OptionForm } from '../components/OptionForm'
import { BaseLayout } from '../layouts/BaseLayout'

export type Options = {
  rescueSecond: boolean
  rescueThird: boolean
  magnification: number
}

export const Home = (): JSX.Element => {
  const [rounds, setRounds] = useState<number[][]>([])
  const [players, setPlayers] = useState<string[]>([])
  const [options, setOptions] = useState<Options>({
    rescueSecond: true,
    rescueThird: false,
    magnification: 1,
  })

  const handleOnChangeMagnification = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    setOptions({ ...options, magnification: Number(e.target.value) })
  }

  const handleAppendUser = (name: string): void => {
    if (!name) {
      return
    }
    setPlayers([...players, name])
  }

  const handleOnChangeScore: ComponentProps<typeof ScoreTable>['onChange'] = (
    score,
    roundIndex,
    index
  ) => {
    const newRounds = deepCopy(rounds)
    newRounds[roundIndex][index] = score
    setRounds(newRounds)
  }

  const handleAddRound = (): void => {
    const newRounds = deepCopy(rounds)
    newRounds.push(filledArray<number>(players.length, 0))
    setRounds(newRounds)
  }

  return (
    <BaseLayout>
      <h2>Step.1 Initial settings</h2>
      <section>
        <OptionForm
          options={options}
          onChange={(newOptions: Options) => setOptions(newOptions)}
        />
        倍率：
        <select
          value={options.magnification}
          onChange={handleOnChangeMagnification}
        >
          <option value="1">x1</option>
          <option value="2">x2</option>
          <option value="3">x3</option>
          <option value="4">x4</option>
          <option value="5">x5</option>
        </select>
        <UserAppendForm onAppended={handleAppendUser} />
      </section>

      <h2>Step.2 Input scores</h2>
      <section>
        <ScoreTable
          players={players}
          rounds={rounds}
          onChange={handleOnChangeScore}
        />
        <button onClick={handleAddRound}>add Round</button>
      </section>

      <h2>Step.3 Results</h2>

      <section>
        <h1>結果</h1>
        <ResultTable players={players} rounds={rounds} options={options} />
      </section>
    </BaseLayout>
  )
}

export default Home
