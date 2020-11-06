import React from 'react'
import { render } from '../testUtils'
// import { render, fireEvent } from '../testUtils'
import { Home } from '../../pages/index'
import { Provider } from 'react-redux'
import { store } from '../../store'
//
describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Home />
      </Provider>,
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
