import { type ReactElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'

const ResetPassword = (): ReactElement => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name='description' content='Sign in to flynar website' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div id='ResetPassword-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 lg:relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Reset Password</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='password'>Masukkan Password Baru</label>
                  <input type='password' placeholder='Masukkan password' id='password' className= 'rounded-2xl h-full w-full pl-4 py-3 border'/>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='password'>Ulangi Password Baru</label>
                  <input type='password' placeholder='Masukkan password' id='password' className= 'rounded-2xl h-full w-full pl-4 py-3 border'/>
                </div>
              </div>
              <button type='submit' className = 'w-full bg-purple-600 text-white rounded-2xl px-6 py-3 text-sm mt-8' >Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
