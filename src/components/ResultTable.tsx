import React, { useMemo } from 'react'
import { TableCell } from './TableCell'
import { Label } from './Label'
import { IResult } from '../interfaces/result'
import { ResultTableFooter } from './ResultTableFooter'
import { IOption } from '../interfaces/option'

type Props = {
  players: string[]
  rounds: number[][]
  options: IOption
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

  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="border">
            <span className="text-xs font-bold text-gray-500">Round</span>
          </th>
          {props.players.map((name) => (
            <th key={`result-head-${name}`} className="border">
              <Label>{name}</Label>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {results.map((row, line) => {
          return (
            <tr key={`line-${line}`}>
              <TableCell className="text-center border">
                <span className="text-xs font-bold text-gray-500">
                  {line + 1}
                </span>
              </TableCell>
              {row.map((column, index) => (
                <TableCell
                  key={`col-${line}-${index}`}
                  className="text-center border"
                >
                  <div>
                    <span className="text-xxs font-bold text-gray-600">
                      {column.rank}位
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">
                      {column.score}
                    </span>
                  </div>
                </TableCell>
              ))}
            </tr>
          )
        })}
      </tbody>
      <ResultTableFooter
        results={results}
        magnification={props.options.magnification}
      />
    </table>
  )
}
