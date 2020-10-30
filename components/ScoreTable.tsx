import React from 'react'

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
      <td key={`column-${roundIndex}-${index}`}>
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
        />
      </td>
    ))
    return (
      <tr key={`round-${roundIndex}`}>
        <td>{roundIndex + 1}</td>
        {tdDoms}
      </tr>
    )
  })

  const playersDom = players.map((name) => <td key={name}>{name}</td>)

  return (
    <table>
      <thead>
        <tr>
          <td>Round</td>
          {playersDom}
        </tr>
      </thead>
      <tbody>{roundsDom}</tbody>
    </table>
  )
}
