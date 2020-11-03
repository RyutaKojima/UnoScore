import React, { useState } from 'react'
import { Label } from './Label'
import { TableCell } from './TableCell'
import { ScoreInput } from './ScoreInput'
import { ToggleButton } from './ToggleButton'

type Props = {
  players: string[]
  rounds: number[][]
  onChange: (score: number, roundIndex: number, index: number) => void
}

export const ScoreTable = (props: Props): JSX.Element => {
  const players = props.players
  const rounds = props.rounds

  const [isSelectCardMode, setIsSelectCardMode] = useState(false)

  const handleOnChangeScore = (
    inputScore: number,
    roundIndex: number,
    scoreIndex: number
  ) => {
    if (Number.isNaN(inputScore)) {
      props.onChange(0, roundIndex, scoreIndex)
    } else {
      props.onChange(inputScore, roundIndex, scoreIndex)
    }
  }

  const roundsDom = rounds.map((round, roundIndex) => {
    const tdDoms = round.map((score, index) => (
      <TableCell key={`column-${roundIndex}-${index}`} className="px-2 py-1">
        <ScoreInput
          id={`${roundIndex}-${index}`}
          isSelectCardMode={isSelectCardMode}
          value={score}
          onChange={(score) => handleOnChangeScore(score, roundIndex, index)}
          className="form-input w-full"
        />
      </TableCell>
    ))
    return (
      <tr key={`round-${roundIndex}`}>
        <TableCell className="text-center">
          <span className="text-xs font-bold text-gray-600">
            {roundIndex + 1}
          </span>
        </TableCell>
        {tdDoms}
      </tr>
    )
  })

  const playersDom = players.map((name) => (
    <TableCell key={name} className="text-center">
      <Label>{name}</Label>
    </TableCell>
  ))

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
            <TableCell>
              <span className="text-xs font-bold text-gray-600">Round</span>
            </TableCell>
            {playersDom}
          </tr>
        </thead>
        <tbody>{roundsDom}</tbody>
      </table>
    </>
  )
}
