import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className='flex min-h-screen flex-col text-primary p-3'>
      <Head>
        <title>ミエルカ | 不動産投資の数字をミエルカするアプリ</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
