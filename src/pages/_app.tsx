import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <div className='flex min-h-screen flex-col text-primary p-3'>
        <Head>
          <title>ミエルカ | 不動産投資の数字をミエルカするアプリ</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta property='og:title' content="ミエルカ | 不動産投資の数字をミエルカするアプリ"/>
          <meta property='og:description' content='投資用不動産を買う時の諸費用・実質利回りを見える化するシミュレーターアプリ！'/>
          <meta name="google-adsense-account" content="ca-pub-9291986532787497"></meta>
        </Head>
        <Component {...pageProps} />
        <Analytics/>
      </div>
    </SessionProvider>
  )
}
