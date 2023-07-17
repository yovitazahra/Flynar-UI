import { type ReactElement, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import AuthPageLayout from '@/layouts/auth'
import type { RootState } from '@/store/index'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const ForgotPassword = (): ReactElement => {
  const dispatch = useDispatch()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())

    if (email === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Mohon Lengkapi Data' }))
      return
    }

    dispatch(setLoadingTrueActionCreator())
    const response = await api.forgotPassword(email)
    if (response instanceof Error) {
      if (axios.isAxiosError(response)) {
        if (response.response?.data?.message !== undefined && response.response?.data?.message !== null) {
          dispatch(setMessageActionCreator({ error: true, text: response.response.data.message }))
        } else {
          dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
        }
      } else {
        dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
      }
    } else {
      dispatch(setMessageActionCreator({ error: false, text: response.message }))
    }
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name='description' content='Reset Your password' />
      </Head>
      <div id='forgot-password-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Forgot Password</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='email'>Email/No Telepon</label>
                  <input type='text' autoComplete='off' autoCorrect='false' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Contoh: johndoe@gmail.com' id='email' className='border rounded-2xl px-4 py-3'/>
                </div>
              </div>
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm mt-8 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Kirim Link'
                }
              </button>
              <div className='flex mt-6'>
                <span className={`${message === null ? 'h-0 w-0 opacity-0' : 'h-fit w-fit opacity-100 px-6 py-2'} ${message?.error === true ? 'bg-red-600' : 'bg-green-400'} duration-300 text-sm mx-auto text-white rounded-2xl text-center`}>
                  {message?.text}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

ForgotPassword.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default ForgotPassword
