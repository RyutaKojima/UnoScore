import React, { useMemo } from 'react'
import { IOption } from '../interfaces/option'
import { ResultTable } from './ResultTable'
import { ResultChart } from './ResultChart'
import { IResult, ResultRow } from '../interfaces/result'

type Props = {
  players: string[]
  rounds: number[][]
  options: IOption
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

export const Result = (props: Props): JSX.Element => {
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

      const fixCurrentRound: ResultRow = rescued.map((v, index) => {
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
    <div>
      <ResultTable
        players={props.players}
        options={props.options}
        results={results}
      />
      <div className="mt-4">
        <ResultChart
          players={props.players}
          options={props.options}
          results={results}
        />
      </div>
    </div>
  )
}
