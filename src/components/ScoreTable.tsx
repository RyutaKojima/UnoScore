import React from 'react'
import clsx from 'clsx'
import { Label } from './Label'

type Props = {
  players: string[]
  rounds: number[][]
  onChange: (score: number, roundIndex: number, index: number) => void
}

export const ScoreTable = (props: Props): JSX.Element => {
  const players = props.players
  const rounds = props.rounds

  const roundsDom = rounds.map((round, roundIndex) => {
    const tdDoms = round.map((score, index) => (
      <TableCell key={`column-${roundIndex}-${index}`} className="px-2 py-1">
        <input
          type="number"
          value={score}
          onChange={(event) => {
            const inputScore: number = parseInt(event.target.value, 10)
            if (Number.isNaN(inputScore)) {
              props.onChange(0, roundIndex, index)
            } else {
              props.onChange(inputScore, roundIndex, index)
            }
          }}
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
  )
}

const TableCell: React.FC<{ className?: string }> = ({
  className,
  children,
}) => {
  return <td className={clsx('px-2 py-1', className)}>{children}</td>
}
