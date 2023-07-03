import type { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import DefaultLayout from '@/layouts/default'

const NotFound = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name='description' content='Too bad, 404 error occured' />
      </Head>
      <main>
        <div className='bg-gray-100 h-screen flex flex-col lg:flex-row justify-center items-center'>
          <div className='order-2 lg:order-1 text-center'>
            <div className='w-fit tracking-widest mt-4'>
              <p className='w-full mb-3 pb-2 text-gray-500 text-3xl md:text-4xl lg:text-6xl block border-b-4 border-yellow-600'><span>4  0  4</span></p>
              <p className='text-gray-500 text-base md:text-lg lg:text-xl'><span className='text-red-600'>Sorry</span>, Not Found!</p>
            </div>
            <div className='mt-6 w-full text-gray-500 font-mono flex justify-center text-md md:text-lg lg:text-xl bg-gray-200 rounded-xl hover:bg-gray-300 hover:text-gray-200'>
              <Link href='/' className='w-full p-2'><span className='font-semibold'>Back Home</span> </Link>
            </div>
          </div>
          <div className='order-1 lg:order-2'>
            <Image src='/images/plane.svg' alt={'plane'} width={600} height={600} className='w-[200px] sm:w-[300px] md:w-[500px] lg:w-[600px]' ></Image>
          </div>
        </div>
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
