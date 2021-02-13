import React, { ChangeEvent, ComponentProps, useState } from 'react'
import { lastOfArray } from '../utils/utils'
import { ScoreTable } from './ScoreTable'
import { BaseLayout } from '../layouts/BaseLayout'
import { Section } from './Section'
import { OptionForm } from './OptionForm'
import { IOption } from '../interfaces/option'
import { Label } from './Label'
import { UserAppendForm } from './UserAppendForm'
import { Result } from './Result'
import { ResetGameButton } from './ResetGameButton'
import { IRound } from '../interfaces/round'
import { ExclamationIcon } from './icons/ExclamationIcon'
import clsx from 'clsx'

type Props = {
  rounds: IRound[]
  addRound: (numberOfPlayers: number) => void
  setScore: (roundIndex: number, playerIndex: number, score: number) => void
  players: string[]
  setPlayers: (players: string[]) => void
  option: IOption
  setOption: (option: IOption) => void
  initializeDatabase: () => void
}

export const HomePage: React.FC<Props> = ({
  rounds,
  addRound,
  setScore,
  players,
  setPlayers,
  option,
  setOption,
  initializeDatabase,
}) => {
  const [isForceChange, setIsForceChange] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const isInputScoreValid = (): boolean => {
    const currentRound: null | number[] = lastOfArray<number[]>(rounds)
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
    setScore(roundIndex, index, score)
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
    setErrors([])
    addRound(players.length)
  }

  const toggleForceChange = (): void => {
    if (!process.browser) {
      return
    }

    if (isForceChange) {
      setIsForceChange(false)
    } else {
      const result = window.confirm('強制修正モードを有効化しますか？')
      if (result) {
        setIsForceChange(true)
      }
    }
  }

  return (
    <BaseLayout
      containerClass="bg-gray-200"
      className="w-full max-w-xl mx-auto flex flex-col space-y-10 py-10 px-3"
    >
      <Section title="Step.1 Initial settings" className="space-y-4">
        <OptionForm
          options={option}
          onChange={(newOptions: IOption) => setOption(newOptions)}
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

      <Section title="Step.2 Input scores" className="relative">
        <div className="absolute right-0 top-0 p-4">
          <button className="flex items-center" onClick={toggleForceChange}>
            <ExclamationIcon
              className={clsx('w-6 h-6', {
                'text-gray-400': !isForceChange,
                'text-red-600': isForceChange,
              })}
            />
          </button>
        </div>
        <ScoreTable
          isForceChange={isForceChange}
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
        <Result players={players} rounds={rounds} options={option} />
      </Section>

      <Section title="Step.4 Clear">
        <div className="text-center mt-4">
          <ResetGameButton onReset={initializeDatabase} />
        </div>
      </Section>
    </BaseLayout>
  )
}
