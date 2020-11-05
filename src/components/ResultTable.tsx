import React, { useMemo } from 'react'
import { Options } from '../pages'
import { TableCell } from './TableCell'
import { Label } from './Label'
import { IResult } from '../interfaces/result'
import { ResultTableFooter } from './ResultTableFooter'

type Props = {
  players: string[]
  rounds: number[][]
  options: Options
}

type ResultRow = IResult[]

export const ResultTable = (props: Props): JSX.Element => {
  const results = useMemo(
    () =>
      props.rounds.map((round) => {
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
      }),
    [props.rounds, props.options]
  )

  const nameHeader = props.players.map((name) => (
    <th key={`result-head-${name}`} className="border">
      <Label>{name}</Label>
    </th>
  ))

  const body = results.map((row, line) => {
    const tds = row.map((column, index) => (
      <TableCell key={`col-${line}-${index}`} className="text-center border">
        <div>
          <span className="text-xxs font-bold text-gray-600">
            {column.rank}位
          </span>
        </div>
        <div>
          <span className="font-bold text-gray-800">{column.score}</span>
        </div>
      </TableCell>
    ))

    return (
      <tr key={`line-${line}`}>
        <TableCell className="text-center border">
          <span className="text-xs font-bold text-gray-500">{line + 1}</span>
        </TableCell>
        {tds}
      </tr>
    )
  })

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="border">
            <span className="text-xs font-bold text-gray-500">Round</span>
          </th>
          {nameHeader}
        </tr>
      </thead>
      <tbody>{body}</tbody>
      <ResultTableFooter
        results={results}
        magnification={props.options.magnification}
      />
    </table>
  )
}
