import { useState, useEffect, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { deleteCookie, setCookie } from 'cookies-next'
import axios from 'axios'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthPageLayout from '@/layouts/auth'
import type { RootState } from '@/store/index'
import { asyncSetAuthUser } from '@/store/authUser/action'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'

const Login = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const authUser: Record<string, any> | null = useSelector((state: RootState) => state.authUser)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (authUser !== null) {
      dispatch(setMessageActionCreator({ error: true, text: 'Anda Sudah Login' }))
      setTimeout(() => {
        void router.push('/')
      }, 2000)
    }
  }, [])

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }
  }, [email, password])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())

    if (email === '' || password === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Mohon Lengkapi Data' }))
      return
    }

    if (password.length < 8) {
      dispatch(setMessageActionCreator({ error: true, text: 'Password Minimal 8 Karakter' }))
      return
    }

    dispatch(setLoadingTrueActionCreator())
    const response = await dispatch(asyncSetAuthUser({ identifier: email, password }))
    if (response instanceof Error) {
      if (axios.isAxiosError(response)) {
        if (response.response?.data?.message !== undefined && response.response?.data?.message !== null) {
          if (response.response.data.message === 'Silahkan Verifikasi Akun Ini') {
            setCookie('loggedEmail', email)
            dispatch(setMessageActionCreator({ error: true, text: response.response.data.message }))
            setTimeout(() => {
              void router.push('/verify-otp')
            }, 2000)
          } else {
            dispatch(setMessageActionCreator({ error: true, text: response.response.data.message }))
          }
        } else {
          dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
        }
      } else {
        dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
      }
    } else {
      deleteCookie('loggedEmail')
      dispatch(setMessageActionCreator({ error: false, text: 'Selamat Datang' }))
      setTimeout(() => {
        void router.push('/')
      }, 2000)
    }
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name='description' content='Sign in to flynar website' />
      </Head>
      <div id='login-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Masuk</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <label htmlFor='email'>Email/No Telepon</label>
                  <input type='text' autoComplete='off' autoCorrect='false' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Contoh: johndoe@gmail.com' id='email' className='border rounded-2xl px-4 py-3'/>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='password'>Password</label>
                    <Link href='forgot-password' className='font-medium text-xs leading-6 text-purple-700 no-underline'>Lupa Kata Sandi</Link>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type={showPassword ? 'text' : 'password'} placeholder='Masukkan password' id='password' className={`${password.length > 0 && password.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={togglePasswordVisibility}>
                      {showPassword
                        ? (<FiEye/>)
                        : ((<FiEyeOff/>))
                      }
                    </button>
                  </div>
                </div>
              </div>
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm mt-8 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Masuk'
                }
              </button>
              <p className='text-center text-sm mt-8'>Belum punya akun?{' '}
                <Link href='/register' className='font-bold text-purple-700'>Daftar di sini</Link>
              </p>
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

Login.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default Login
