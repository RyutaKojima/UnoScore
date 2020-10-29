import React, { useState } from 'react'

export const ScoreTable = function () {
  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))
  const [rounds, setRounds] = useState([[0, 0]])
  const users = ['小島', '林']

  const roundsDom = rounds.map((round, roundIndex) => {
    const tdDoms = round.map((score, index) => (
      <td key={`column-${roundIndex}-${index}`}>
        <input
          type="number"
          value={score}
          onChange={(event) => {
            const newRounds = deepCopy(rounds)
            newRounds[roundIndex][index] = event.target.value
            setRounds(newRounds)
          }}
        />
      </td>
    ))
    return (
      <tr key={`round-${roundIndex}`}>
        <td>Round-1</td>
        {tdDoms}
      </tr>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <td>Round</td>
          <td>{users[0]}</td>
          <td>{users[1]}</td>
        </tr>
      </thead>
      <tbody>{roundsDom}</tbody>
    </table>
  )
}
