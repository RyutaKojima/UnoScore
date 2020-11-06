import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import '../css/tailwind.css'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
