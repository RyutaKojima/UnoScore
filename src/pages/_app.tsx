import { AppProps } from 'next/app'
import '../css/tailwind.css'
import { RecoilRoot } from 'recoil'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
