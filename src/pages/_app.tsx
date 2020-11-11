import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import '../css/tailwind.css'
import { useEffect } from 'react'
import { rootRef } from '../plugins/firebase'
import { gameSlice } from '../store/game'
import { IGame } from '../interfaces/game'

export default function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    rootRef.on('value', (snapshot) => {
      const snapshotValue = snapshot.val()
      const game: Partial<IGame> = snapshotValue.game ?? {}
      store.dispatch(gameSlice.actions.setGame(game))
    })

    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      rootRef.set(state)
    })

    return () => {
      rootRef.off()
      unsubscribe()
    }
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
