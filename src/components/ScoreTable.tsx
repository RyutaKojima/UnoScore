import React, { useState } from 'react'
import { Label } from './Label'
import { TableCell } from './TableCell'
import { MemorizedScoreInput } from './ScoreInput'
import { ToggleButton } from './ToggleButton'

type Props = {
  players: string[]
  rounds: number[][]
  isForceChange: boolean
  onChange: (score: number, roundIndex: number, index: number) => void
}

export const ScoreTable = (props: Props): JSX.Element => {
  const { players, rounds, isForceChange } = props

  const [isSelectCardMode, setIsSelectCardMode] = useState(true)

  const handleOnChangeScore = (
    inputScore: number,
    roundIndex: number,
    scoreIndex: number
  ) => {
    if (Number.isNaN(inputScore)) {
      props.onChange(0, roundIndex, scoreIndex)
      return
    }
    if (inputScore < 0) {
      props.onChange(0, roundIndex, scoreIndex)
      return
    }

    props.onChange(inputScore, roundIndex, scoreIndex)
  }

  return (
    <>
      <div className="text-right">
        <ToggleButton
          value={isSelectCardMode}
          setValue={setIsSelectCardMode}
          label="カード選択モード"
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <TableCell className="sticky top-0 bg-white">
              <span className="text-xs font-bold text-gray-600">Round</span>
            </TableCell>
            {players.map((name) => (
              <TableCell
                key={name}
                className="text-center sticky top-0 bg-white"
              >
                <Label>{name}</Label>
              </TableCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, roundIndex) => {
            return (
              <tr key={`round-${roundIndex}`}>
                <TableCell className="text-center">
                  <span className="text-xs font-bold text-gray-600">
                    {roundIndex + 1}
                  </span>
                </TableCell>
                {round.map((score, index) => (
                  <TableCell
                    key={`column-${roundIndex}-${index}`}
                    className="px-2 py-1"
                  >
                    <MemorizedScoreInput
                      id={`${roundIndex}-${index}`}
                      isSelectCardMode={isSelectCardMode}
                      value={score}
                      onChange={(score) =>
                        handleOnChangeScore(score, roundIndex, index)
                      }
                      disabled={
                        !isForceChange && roundIndex !== rounds.length - 1
                      }
                      className="form-input w-full disabled:bg-gray-300 p-1"
                    />
                  </TableCell>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
