import { AppProps } from 'next/app'
import '../css/tailwind.css'
import { RecoilRoot } from 'recoil'

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <Component {...pageProps} />
    </RecoilRoot>
  )
}
