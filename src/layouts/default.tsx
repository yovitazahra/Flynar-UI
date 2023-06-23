import type { ReactElement } from 'react'
import Head from 'next/head'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface IDefaultLayoutProps {
  children: React.ReactNode
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['devanagari']
})

const DefaultLayout = ({ children }: IDefaultLayoutProps): ReactElement => {
  return (
    <>
      <Head>
        <title>Flynar</title>
        <meta name='description' content='One of the best flights tickets website' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        {/* <link rel='icon' href='/images/favicon.png' sizes='any' /> */}
      </Head>
      <div className={poppins.className}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
}

export default DefaultLayout
