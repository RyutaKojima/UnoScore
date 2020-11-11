import { AppProps } from 'next/app'
import '../css/tailwind.css'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
