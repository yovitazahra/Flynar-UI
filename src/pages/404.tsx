import type { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const NotFound = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name='description' content='Too bad, 404 error occured' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
        <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' type='image/png' sizes='any' />
      </Head>
      <main>
        <div className='bg-gray-100 h-screen pl-[5%] flex justify-center items-center'>
          <div>
            <div className='w-fit tracking-widest mt-4'>
              <span className='w-fit mb-3 pb-2 text-gray-500 text-3xl md:text-4xl lg:text-6xl block border-b-4 border-yellow-600'><span>4  0  4</span></span>
              <span className='text-gray-500 text-base md:text-lg lg:text-xl'><span className='text-red-600'>Sorry</span>, Not Found!</span>
            </div>
            <div className='mt-6 w-fit text-gray-500 font-mono text-md md:text-lg lg:text-xl bg-gray-200 p-2 rounded-xl hover:bg-gray-300 hover:text-gray-200'>
              <Link href='/'>Back <span className='font-semibold'>Home</span> </Link>
            </div>
          </div>
          <div>
            <Image src='/images/plane.svg' alt={'plane'} width={600} height={600} className='w-[200px] sm:w-[300px] md:w-[500px] lg:w-[600px]' ></Image>
          </div>
        </div>
      </main>
    </>
  )
}

export default NotFound
