import type { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import DefaultLayout from '@/layouts/default'

const NotFound = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name='description' content='Too bad, 404 error occured' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main className='flex flex-col p-6 container m-auto'>
        <h1>404</h1>
        <p>Not Found</p>
        <Link href='/'>Kembali ke Beranda</Link>
      </main>
    </>
  )
}

NotFound.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default NotFound
