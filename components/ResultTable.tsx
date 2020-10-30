import React from 'react'
import { Options } from '../pages'
import { sumArray } from '../utils/utils'

type Props = {
  players: string[]
  rounds: number[][]
  options: Options
}

type ResultValue = { rank: number; score: number }
type ResultRow = ResultValue[]

export const ResultTable = (props: Props): JSX.Element => {
  const results = props.rounds.map((round) => {
    const ranking: ResultRow = round.map((v) => ({
      rank: round.filter((target) => v > target).length + 1,
      score: v,
    }))

    const rescued: ResultRow = ranking.map((v) => {
      if (v.rank === 2 && props.options.rescueSecond) {
        return { ...v, score: 0 }
      }
      if (v.rank === 3 && props.options.rescueThird) {
        return { ...v, score: 0 }
      }
      return { ...v, score: v.score }
    })

    const sumScore: number = rescued.reduce(
      (prev, current) => prev + current.score,
      0
    )

    return rescued.map((v) => {
      return {
        ...v,
        score: v.rank === 1 ? sumScore : v.score * -1,
      }
    })
  })

  const finalScores: number[] = results.reduce(
    (prev: number[], result): number[] => {
      const scores: number[] = result.map((r) => r.score)
      if (prev.length === 0) {
        return scores
      }

      return sumArray(prev, scores)
    },
    []
  )
  const finalTds = finalScores.map((score, index) => (
    <td key={`final-${index}`}>{score}</td>
  ))

  const nameHeader = props.players.map((name) => (
    <th key={`result-head-${name}`}>{name}</th>
  ))

  const body = results.map((row, line) => {
    const tds = row.map((column, index) => (
      <td key={`col-${line}-${index}`}>
        <div>{column.rank}</div>
        <div>{column.score}</div>
      </td>
    ))

    return (
      <tr key={`line-${line}`}>
        <td>{line + 1}</td>
        {tds}
      </tr>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Round</th>
          {nameHeader}
        </tr>
      </thead>
      <tbody>{body}</tbody>
      <tfoot>
        <tr>
          <th>合計</th>
          {finalTds}
        </tr>
      </tfoot>
    </table>
  )
}
