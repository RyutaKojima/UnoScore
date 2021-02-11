import React from 'react'
import { TableCell } from './TableCell'
import { Label } from './Label'
import { ResultRow } from '../interfaces/result'
import { ResultTableFooter } from './ResultTableFooter'
import { IOption } from '../interfaces/option'
import clsx from 'clsx'

type Props = {
  players: string[]
  options: IOption
  results: ResultRow[]
}

const getRankColor = (rank: number): string => {
  return clsx('font-bold', {
    'text-orange-600': rank === 1,
    'text-blue-600': rank === 2,
    'text-gray-600': rank >= 3,
  })
}

export const ResultTable = (props: Props): JSX.Element => {
  const results = props.results

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
