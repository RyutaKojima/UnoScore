import React, { useMemo } from 'react'
import { TableCell } from './TableCell'
import { Label } from './Label'
import { IResult } from '../interfaces/result'
import { ResultTableFooter } from './ResultTableFooter'
import { IOption } from '../interfaces/option'
import clsx from 'clsx'

type Props = {
  players: string[]
  rounds: number[][]
  options: IOption
}

type ResultRow = IResult[]

const getRankColor = (rank: number): string => {
  return clsx('font-bold', {
    'text-orange-600': rank === 1,
    'text-blue-600': rank === 2,
    'text-gray-600': rank >= 3,
  })
}

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
          <th className="border sticky top-0 bg-white">
            <span className="text-xs font-bold text-gray-500">Round</span>
          </th>
          {props.players.map((name) => (
            <th
              key={`result-head-${name}`}
              className="border sticky top-0 bg-white"
            >
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
                    <span
                      className={clsx(
                        'text-xxs font-bold',
                        getRankColor(column.rank)
                      )}
                    >
                      {column.rank}位
                    </span>
                  </div>
                  <div>
                    <span
                      className={clsx({
                        'text-gray-800': column.score >= 0,
                        'text-red-600': column.score < 0,
                      })}
                    >
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
