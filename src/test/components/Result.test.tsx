import React from 'react'
import { render } from '../testUtils'
import { Result, calculateResults } from '../../components/Result'
import { IOption } from '../../interfaces/option'

describe('Result logic and component', () => {
  const defaultOptions: IOption = {
    rescueSecond: false,
    rescueThird: false,
    magnification: 1,
  }

  describe('calculateResults logic', () => {
    it('returns empty array when rounds are empty', () => {
      const results = calculateResults([], defaultOptions)
      expect(results).toEqual([])
    })

    it('calculates ranks and scores correctly for a single round without rescues', () => {
      // Player 0: 10 (rank 1)
      // Player 1: 20 (rank 2) -> score: -20
      // Player 2: 30 (rank 3) -> score: -30
      // Player 3: 40 (rank 4) -> score: -40
      // Player 0 score = sum of round scores = 10 + 20 + 30 + 40 = 100
      const rounds = [[10, 20, 30, 40]]
      const results = calculateResults(rounds, defaultOptions)

      expect(results).toHaveLength(1)
      expect(results[0]).toEqual([
        { rank: 1, score: 100, total: 100 },
        { rank: 2, score: -20, total: -20 },
        { rank: 3, score: -30, total: -30 },
        { rank: 4, score: -40, total: -40 },
      ])
    })

    it('applies rescueSecond option correctly', () => {
      const options: IOption = { ...defaultOptions, rescueSecond: true }
      const rounds = [[10, 20, 30, 40]]
      const results = calculateResults(rounds, options)

      // Rank 2 player (score 20) is rescued -> raw rescued score becomes 0
      // Round score total = 10 + 0 + 30 + 40 = 80
      expect(results[0]).toEqual([
        { rank: 1, score: 80, total: 80 },
        { rank: 2, score: -0, total: 0 },
        { rank: 3, score: -30, total: -30 },
        { rank: 4, score: -40, total: -40 },
      ])
    })

    it('applies rescueThird option correctly', () => {
      const options: IOption = { ...defaultOptions, rescueThird: true }
      const rounds = [[10, 20, 30, 40]]
      const results = calculateResults(rounds, options)

      // Rank 3 player (score 30) is rescued -> raw rescued score becomes 0
      // Round score total = 10 + 20 + 0 + 40 = 70
      expect(results[0]).toEqual([
        { rank: 1, score: 70, total: 70 },
        { rank: 2, score: -20, total: -20 },
        { rank: 3, score: -0, total: 0 },
        { rank: 4, score: -40, total: -40 },
      ])
    })

    it('applies both rescueSecond and rescueThird options', () => {
      const options: IOption = {
        ...defaultOptions,
        rescueSecond: true,
        rescueThird: true,
      }
      const rounds = [[10, 20, 30, 40]]
      const results = calculateResults(rounds, options)

      // Rank 2 and 3 rescued -> 0
      // Round score total = 10 + 0 + 0 + 40 = 50
      expect(results[0]).toEqual([
        { rank: 1, score: 50, total: 50 },
        { rank: 2, score: -0, total: 0 },
        { rank: 3, score: -0, total: 0 },
        { rank: 4, score: -40, total: -40 },
      ])
    })

    it('handles tied scores (standard competition ranking)', () => {
      // Two rank 1 players (scores 10, 10), then 30 (rank 3), 40 (rank 4)
      const rounds = [[10, 10, 30, 40]]
      const results = calculateResults(rounds, defaultOptions)

      // Total rescued = 10 + 10 + 30 + 40 = 90
      // Each rank 1 gets 90
      expect(results[0][0].rank).toBe(1)
      expect(results[0][1].rank).toBe(1)
      expect(results[0][2].rank).toBe(3)
      expect(results[0][3].rank).toBe(4)

      expect(results[0][0].score).toBe(90)
      expect(results[0][1].score).toBe(90)
      expect(results[0][2].score).toBe(-30)
      expect(results[0][3].score).toBe(-40)
    })

    it('accumulates totals correctly across multiple rounds', () => {
      const rounds = [
        [10, 20, 30, 40], // R1: P0 wins -> scores: [100, -20, -30, -40]
        [40, 30, 20, 10], // R2: P3 wins -> scores: [-40, -30, -20, 100]
      ]
      const results = calculateResults(rounds, defaultOptions)

      expect(results).toHaveLength(2)

      // Round 1 totals
      expect(results[0]).toEqual([
        { rank: 1, score: 100, total: 100 },
        { rank: 2, score: -20, total: -20 },
        { rank: 3, score: -30, total: -30 },
        { rank: 4, score: -40, total: -40 },
      ])

      // Round 2 totals = R1 total + R2 score
      expect(results[1]).toEqual([
        { rank: 4, score: -40, total: 60 },
        { rank: 3, score: -30, total: -50 },
        { rank: 2, score: -20, total: -50 },
        { rank: 1, score: 100, total: 60 },
      ])
    })
  })

  describe('Result Component', () => {
    it('renders player headers and results correctly', () => {
      const players = ['Player 1', 'Player 2']
      const rounds = [[5, 10]]
      const { getByText } = render(
        <Result players={players} rounds={rounds} options={defaultOptions} />,
        {}
      )

      expect(getByText('Player 1')).toBeInTheDocument()
      expect(getByText('Player 2')).toBeInTheDocument()
      expect(getByText('1位')).toBeInTheDocument()
      expect(getByText('2位')).toBeInTheDocument()
    })
  })
})
