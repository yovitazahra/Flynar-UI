import { useState, useEffect } from 'react'
import type { ReactElement, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import axios from 'axios'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthPageLayout from '@/layouts/auth'
import ShortMessage from '@/components/ShortMessage'
import isEmailValid from '@/utils/isEmailValid'
import type { RootState } from '@/store/index'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const Register = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }
  }, [name, email, password, phoneNumber])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())

    if (name === '' || email === '' || password === '' || phoneNumber === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Mohon Lengkapi Data' }))
      return
    }

    if (isNaN(parseInt(phoneNumber))) {
      dispatch(setMessageActionCreator({ error: true, text: 'Nomor Telepon Wajib Angka' }))
      return
    }

    if (password.length < 8) {
      dispatch(setMessageActionCreator({ error: true, text: 'Password Minimal 8 Karakter' }))
      return
    }

    dispatch(setLoadingTrueActionCreator())
    const response = await api.register(name, email, password, phoneNumber)
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
      setCookie('loggedEmail', email)
      dispatch(setMessageActionCreator({ error: false, text: 'Silahkan Lanjut Verifikasi' }))
      setTimeout(() => {
        void router.push('/verify-otp')
      }, 2000)
    }
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name='description' content='Sign up to flynar website' />
      </Head>
      <div id='register-page'>
        <div className='flex h-screen overflow-hidden'>
          <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
            <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
            <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
          </div>
          <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
            <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
              <form action='' autoComplete='off' onSubmit={(e) => { void handleSubmit(e) } }>
                <h5 className='text-2xl leading-9 mb-6 font-bold'>Daftar</h5>
                <div className='flex flex-col gap-y-3 text-sm'>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='name'>Nama</label>
                    <input type='text' value={name} autoComplete='off' autoCorrect='false' placeholder='Nama Lengkap' id='name' className='border rounded-2xl px-4 py-3' onChange={(e) => { setName(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' value={email} autoComplete='off' autoCorrect='false' placeholder='Contoh: johndoe@gmail.com' id='email' className={`${isEmailValid(email) === null && 'wrong-input'} border rounded-2xl px-4 py-3`} onChange={(e) => { setEmail(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='phoneNumber'>Nomor Telepon</label>
                    <input type='number' value={phoneNumber} autoComplete='off' autoCorrect='false' placeholder='08...' id='phoneNumber' className={`${isNaN(parseInt(phoneNumber)) && phoneNumber.length > 0 && 'wrong-input'} border rounded-2xl px-4 py-3`} onChange={(e) => { setPhoneNumber(e.target.value) }}/>
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    <label htmlFor='password'>Password</label>
                    <div className='flex justify-between relative'>
                      <input type={showPassword ? 'text' : 'password'} value={password} placeholder='Buat password' id='password' className={`${password.length > 0 && password.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`} onChange={(e) => { setPassword(e.target.value) }}/>
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
                      : 'Daftar'
                  }
                </button>
                <p className='text-sm text-center mt-8'>Sudah punya akun?{' '}
                  <Link href='/login' className='text-purple-700 font-bold'>Masuk di sini</Link>
                </p>
                <ShortMessage message={message} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Register.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default Register
