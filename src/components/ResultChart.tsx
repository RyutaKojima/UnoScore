import React from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
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

export const ResultChart = (props: Props): JSX.Element => {
  const data = props.results.map((round, roundIndex) => {
    const chart: { [key: string]: string | number } = {
      name: `R-${roundIndex + 1}`,
    }
    props.players.forEach((name, playerIndex) => {
      chart[name] = round[playerIndex]?.total ?? 0
    })

    return chart
  })

  return (
    <LineChart
      width={400}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      {props.players.map((name, index) => (
        <Line
          key={`line-${index}-${name}`}
          type="monotone"
          dataKey={name}
          stroke={colorTable[index] ?? '#000000'}
        />
      ))}

      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}
