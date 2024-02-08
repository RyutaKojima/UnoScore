import React, { useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { IOption } from '../interfaces/option'
import { ResultRow } from '../interfaces/result'

type Props = {
  players: string[]
  options: IOption
  results: ResultRow[]
}

const colorTable = [
  '#ff7300',
  '#387908',
  '#3157fc',
  '#ff5656',
  '#00fbff',
  '#656565',
  '#d900ff',
]

type ChartRow = {
  name: string
  [key: string]: string | number
}
type ChartData = ChartRow[]

export const ResultChart: React.VFC<Props> = ({ results, players }) => {
  const formattedData = useMemo<ChartData>(() => {
    const data = results.map((round, roundIndex) => {
      const scores = Object.fromEntries(
        players.map((name, playerIndex) => {
          const score = round[playerIndex]?.total ?? 0
          return [name, score]
        })
      )

      return {
        name: `R-${roundIndex + 1}`,
        ...scores,
      }
    })

    const firstRow: ChartRow = {
      ...Object.fromEntries(players.map((name) => [name, 0])),
      name: '',
    }

    return [firstRow, ...data]
  }, [results, players])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        {players.map((name, index) => (
          <Line
            key={`line-${index}-${name}`}
            type="monotone"
            dataKey={name}
            stroke={colorTable[index] ?? '#000000'}
          />
        ))}

        <ReferenceLine y={0} stroke="#ccc" ifOverflow="extendDomain" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </LineChart>
    </ResponsiveContainer>
  )
}
