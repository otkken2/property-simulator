import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div className='flex min-h-screen flex-col text-primary p-3'>
      <Component {...pageProps} />
    </div>
  )
}
