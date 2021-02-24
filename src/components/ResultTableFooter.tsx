import React from 'react'
import { TableCell } from './TableCell'
import { sumArray } from '../utils/utils'
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
  const totalScores: number[] = results.reduce<number[]>((prev, result) => {
    const scores = result.map((r) => r.score)
    if (prev.length === 0) {
      return scores
    }

    return sumArray(prev, scores)
  }, [])

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
