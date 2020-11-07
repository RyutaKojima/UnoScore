import React, { ChangeEvent, ComponentProps, useState } from 'react'
import { ScoreTable } from '../components/ScoreTable'
import { deepCopy, filledArray, lastOfArray } from '../utils/utils'
import { UserAppendForm } from '../components/UserAppendForm'
import { ResultTable } from '../components/ResultTable'
import { OptionForm } from '../components/OptionForm'
import { BaseLayout } from '../layouts/BaseLayout'
import { Section } from '../components/Section'
import { Label } from '../components/Label'
import { useRounds } from '../hooks/use-rounds'
import { usePlayers } from '../hooks/use-players'
import { useOption } from '../hooks/use-option'
import { ResetGameButton } from '../components/RestGameButton'

export type Options = {
  rescueSecond: boolean
  rescueThird: boolean
  magnification: number
}

export const Home = (): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([])
  const [rounds, setRounds] = useRounds()
  const [players, setPlayers] = usePlayers()
  const [option, setOption] = useOption()

  const isInputScoreValid = (): boolean => {
    const currentRound: number[] = lastOfArray<number[]>(rounds)
    if (currentRound === null) {
      return true
    }

    return currentRound.filter((score) => score === 0).length === 1
  }

  const handleOnChangeMagnification = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    setOption({ ...option, magnification: Number(e.target.value) })
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
    if (players.length <= 1) {
      setErrors(['プレイヤーを登録してください'])
      return
    }
    if (!isInputScoreValid()) {
      setErrors(['スコアが未入力のプレイヤーがいます'])
      return
    }
    const newRounds = deepCopy(rounds)
    newRounds.push(filledArray<number>(players.length, 0))
    setRounds(newRounds)
  }

  return (
    <BaseLayout
      containerClass="bg-gray-200"
      className="w-full max-w-xl mx-auto flex flex-col space-y-10 py-10 px-3"
    >
      <Section title="Step.1 Initial settings" className="space-y-4">
        <OptionForm
          options={option}
          onChange={(newOptions: Options) => setOption(newOptions)}
        />

        <label className="block mt-4">
          <Label>倍率：</Label>
          <select
            value={option.magnification}
            className="form-select mt-1 block w-full"
            onChange={handleOnChangeMagnification}
          >
            <option value="1">x1</option>
            <option value="2">x2</option>
            <option value="3">x3</option>
            <option value="4">x4</option>
            <option value="5">x5</option>
          </select>
        </label>

        <UserAppendForm onAppended={handleAppendUser} />
      </Section>

      <Section title="Step.2 Input scores">
        <ScoreTable
          players={players}
          rounds={rounds}
          onChange={handleOnChangeScore}
        />
        <p className="text-red-400">{errors}</p>
        <div className="text-center mt-4">
          <button
            onClick={handleAddRound}
            className="btn bg-gradient-to-r from-teal-400 to-blue-500 text-white"
          >
            add Round
          </button>
        </div>
      </Section>

      <Section title="Step.3 Results">
        <ResultTable players={players} rounds={rounds} options={option} />
        <div className="text-center mt-4">
          <ResetGameButton />
        </div>
      </Section>
    </BaseLayout>
  )
}

export default Home
