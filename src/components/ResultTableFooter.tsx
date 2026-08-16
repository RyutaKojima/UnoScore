import React, { useMemo } from 'react'
import { TableCell } from './TableCell'
import { IResult } from '../interfaces/result'
import clsx from 'clsx'
import { IMagnification } from '../interfaces/magnification'

type Props = {
  results: IResult[][]
  magnification: IMagnification
}

export const ResultTableFooter: React.FC<Props> = ({
  results,
  magnification,
}) => {
  // Optimization: Single-pass accumulation directly accesses score properties,
  // avoiding intermediate .map() array allocations and sumArray function calls per round.
  const totalScores: number[] = useMemo(() => {
    if (results.length === 0) return []
    const numPlayers = results[0].length
    const totals = new Array(numPlayers).fill(0)
    for (let r = 0; r < results.length; r++) {
      const round = results[r]
      for (let p = 0; p < numPlayers; p++) {
        totals[p] += round[p].score
      }
    }
    return totals
  }, [results])

  const finalScores: number[] | null =
    typeof magnification === 'number'
      ? totalScores.map((score) => score * magnification)
      : null

  return (
    <tfoot>
      <tr className="bg-gray-100">
        <th className="border">
          <span className="text-xs font-bold text-gray-700">合計</span>
        </th>
        {totalScores.map((score, index) => (
          <TableCell
            key={`result-score-${index}`}
            className="text-center border"
          >
            <span
              className={clsx('font-bold', {
                'text-gray-800': score >= 0,
                'text-red-600': score < 0,
              })}
            >
              {score}
            </span>
          </TableCell>
        ))}
      </tr>
      {finalScores && (
        <tr>
          <th className="border">
            <span className="text-xs font-bold text-gray-700">
              合計(x{magnification})
            </span>
          </th>
          {finalScores.map((score, index) => (
            <TableCell key={`final-${index}`} className="text-center border">
              <span
                className={clsx('font-bold', {
                  'text-gray-800': score >= 0,
                  'text-red-600': score < 0,
                })}
              >
                {score}
              </span>
            </TableCell>
          ))}
        </tr>
      )}
    </tfoot>
  )
}
