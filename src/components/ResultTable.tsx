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

const getFinalScore = (
  rank: number,
  rawScore: number,
  options: IOption
): number => {
  if (rank === 2 && options.rescueSecond) {
    return 0
  }
  if (rank === 3 && options.rescueThird) {
    return 0
  }

  return rawScore
}

export const ResultTable = (props: Props): JSX.Element => {
  const results = useMemo(() => {
    let prevRound: IResult[] = []
    return props.rounds.map((round) => {
      const ranking: ResultRow = round.map((v) => ({
        rank: round.filter((target) => v > target).length + 1,
        score: v,
        total: 0,
      }))

      const rescued: ResultRow = ranking.map((v) => ({
        ...v,
        score: getFinalScore(v.rank, v.score, props.options),
      }))

      const roundScoreTotal: number = rescued.reduce(
        (prev, current) => prev + current.score,
        0
      )

      const fixCurrentRound = rescued.map((v, index) => {
        const score = v.rank === 1 ? roundScoreTotal : v.score * -1
        return {
          ...v,
          score,
          total: score + (prevRound[index]?.total ?? 0),
        }
      })

      prevRound = fixCurrentRound
      return fixCurrentRound
    })
  }, [props.rounds, props.options])

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
                  <div
                    className={clsx('text-xxs border-t', {
                      'text-gray-800': column.total >= 0,
                      'text-red-600': column.total < 0,
                    })}
                  >
                    {column.total}
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
