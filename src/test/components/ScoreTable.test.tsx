import React from 'react'
import { render, fireEvent } from '../testUtils'
import { ScoreTable } from '../../components/ScoreTable'

describe('ScoreTable', () => {
  const players = ['Alice', 'Bob']
  const rounds = [[10, 20]]

  it('renders players and round scores correctly', () => {
    const onChange = jest.fn()
    const { getByText, getByDisplayValue } = render(
      <ScoreTable
        players={players}
        rounds={rounds}
        isForceChange={false}
        onChange={onChange}
      />,
      {}
    )

    expect(getByText('Alice')).toBeInTheDocument()
    expect(getByText('Bob')).toBeInTheDocument()
    expect(getByDisplayValue('10')).toBeInTheDocument()
    expect(getByDisplayValue('20')).toBeInTheDocument()
  })

  it('calls onChange with non-negative score on input change', () => {
    const onChange = jest.fn()
    const { getByDisplayValue } = render(
      <ScoreTable
        players={players}
        rounds={rounds}
        isForceChange={false}
        onChange={onChange}
      />,
      {}
    )

    const input = getByDisplayValue('10')
    fireEvent.change(input, { target: { value: '15' } })

    expect(onChange).toHaveBeenCalledWith(15, 0, 0)
  })

  it('resets score to 0 when input is negative or NaN', () => {
    const onChange = jest.fn()
    const { getByDisplayValue } = render(
      <ScoreTable
        players={players}
        rounds={rounds}
        isForceChange={false}
        onChange={onChange}
      />,
      {}
    )

    const input = getByDisplayValue('10')

    // Negative score
    fireEvent.change(input, { target: { value: '-5' } })
    expect(onChange).toHaveBeenCalledWith(0, 0, 0)

    // NaN score
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(onChange).toHaveBeenCalledWith(0, 0, 0)
  })
})
