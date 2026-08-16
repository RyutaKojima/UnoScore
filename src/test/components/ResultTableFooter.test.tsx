import React from 'react'
import { render } from '../testUtils'
import { ResultTableFooter } from '../../components/ResultTableFooter'
import { IResult } from '../../interfaces/result'

describe('ResultTableFooter', () => {
  const sampleResults: IResult[][] = [
    [
      { rank: 1, score: 90, total: 90 },
      { rank: 2, score: -20, total: -20 },
      { rank: 3, score: -30, total: -30 },
      { rank: 4, score: -40, total: -40 },
    ],
    [
      { rank: 4, score: -40, total: 50 },
      { rank: 3, score: -30, total: -50 },
      { rank: 2, score: -20, total: -50 },
      { rank: 1, score: 90, total: 50 },
    ],
  ]

  it('renders total scores correctly across rounds', () => {
    // Player 0: 90 + (-40) = 50
    // Player 1: -20 + (-30) = -50
    // Player 2: -30 + (-20) = -50
    // Player 3: -40 + 90 = 50
    const { getByText, getAllByText } = render(
      <table>
        <ResultTableFooter results={sampleResults} magnification={1} />
      </table>,
      {}
    )

    expect(getByText('合計')).toBeDefined()
    expect(getAllByText('50').length).toBeGreaterThanOrEqual(2)
    expect(getAllByText('-50').length).toBeGreaterThanOrEqual(2)
  })

  it('renders multiplied final scores when magnification is a number', () => {
    const { getByText, getAllByText } = render(
      <table>
        <ResultTableFooter results={sampleResults} magnification={2} />
      </table>,
      {}
    )

    expect(getByText('合計(x2)')).toBeDefined()
    // 50 * 2 = 100, -50 * 2 = -100
    expect(getAllByText('100').length).toBe(2)
    expect(getAllByText('-100').length).toBe(2)
  })

  it('does not render multiplied final scores row when magnification is random', () => {
    const { queryByText } = render(
      <table>
        <ResultTableFooter results={sampleResults} magnification="random" />
      </table>,
      {}
    )

    expect(queryByText(/合計\(x/)).toBeNull()
  })

  it('handles empty results without crashing', () => {
    const { getByText } = render(
      <table>
        <ResultTableFooter results={[]} magnification={1} />
      </table>,
      {}
    )

    expect(getByText('合計')).toBeDefined()
  })
})
