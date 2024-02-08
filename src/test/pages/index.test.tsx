import React from 'react'
import { render } from '../testUtils'
import { HomePage } from '../../components/HomePage'
// import { render, fireEvent } from '../testUtils'

describe('Home page', () => {
  it('matches snapshot', () => {
    const handleSet = () => {
      return
    }

    const { asFragment } = render(
      <HomePage
        loading={false}
        rounds={[]}
        players={[]}
        option={{
          rescueSecond: true,
          rescueThird: false,
          magnification: 1,
        }}
        addRound={handleSet}
        setScore={handleSet}
        setPlayers={handleSet}
        setOption={handleSet}
        initializeDatabase={handleSet}
      />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
  //   it('clicking button triggers alert', () => {
  //   const { getByText } = render(<Home />, {})
  //   window.alert = jest.fn()
  //   fireEvent.click(getByText('Test Button'))
  //   expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  //   })
})
