import { type ReactElement, useState, useEffect, type SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import AuthPageLayout from '@/layouts/auth'
import type { RootState } from '@/store/index'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const ResetPassword = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const [token, setToken] = useState<SetStateAction<any>>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const token = searchParams.get('token')
    setToken(token)
  }, [])

  useEffect(() => {
    if (token === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Token Invalid' }))
      setTimeout(() => {
        void router.push('/forgot-password')
      }, 2500)
    }
  }, [token])

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }

    if (token === null) {
      const token = searchParams.get('token')
      setToken(token)
    }
  }, [newPassword, confirmPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())

    if (newPassword === '' || confirmPassword === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Mohon Lengkapi Data' }))
      return
    }

    if (newPassword.length < 8) {
      dispatch(setMessageActionCreator({ error: true, text: 'Password Minimal 8 Karakter' }))
      return
    }

    if (newPassword !== confirmPassword) {
      dispatch(setMessageActionCreator({ error: true, text: 'Password dan Konfirmasi Password Berbeda' }))
      return
    }

    if (token === null || token === '') {
      dispatch(setMessageActionCreator({ error: true, text: 'Token Kosong' }))
      return
    }

    dispatch(setLoadingTrueActionCreator())
    const response = await api.resetPassword(token, newPassword, confirmPassword)
    if (response instanceof Error) {
      if (axios.isAxiosError(response)) {
        if (response.response?.data?.message !== undefined && response.response?.data?.message !== null) {
          if (response.response.data.message === 'Token Kadaluwarsa atau Invalid') {
            setTimeout(() => {
              void router.push('/forgot-password')
            }, 2000)
          }
          dispatch(setMessageActionCreator({ error: true, text: response.response.data.message }))
        } else {
          dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
        }
      } else {
        dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
      }
    } else {
      dispatch(setMessageActionCreator({ error: false, text: response.message }))
      setTimeout(() => {
        void router.push('/login')
      }, 2000)
    }
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name='description' content='Set Your new password and Reset Your old password' />
      </Head>
      <div id='reset-password-page' className='flex h-screen overflow-hidden'>
        <div className='hidden lg:w-1/2 relative lg:flex lg:px-8'>
          <Image src='/images/auth-background.png' fill={true} sizes='100%' priority={true} alt='Auth Page Background' className='object-cover'/>
          <Image src='/images/flynar-logo.png' width={200} height={200} loading='lazy' alt='Flynar Logo' className='absolute bottom-0'/>
        </div>
        <div className='w-full h-full flex px-6 py-4 lg:p-0 lg:w-1/2 auth-bg-2'>
          <div className='m-auto w-full md:w-3/6 lg:w-4/6'>
            <form onSubmit={(e) => { void handleSubmit(e) } } action=''>
              <h5 className='font-bold text-2xl leading-9 mb-6'>Reset Password</h5>
              <div className='flex flex-col gap-y-3 text-sm'>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='new-password'>Password Baru</label>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} type={showNewPassword ? 'text' : 'password'} placeholder='Masukkan password baru' id='new-password' className={`${newPassword.length > 0 && newPassword.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={() => { setShowNewPassword(!showNewPassword) }}>
                      {showNewPassword
                        ? (<FiEye/>)
                        : ((<FiEyeOff/>))
                      }
                    </button>
                  </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                  <div className='flex items-center justify-between mb-1'>
                    <label htmlFor='confirm-password'>Konfirmasi Password Baru</label>
                  </div>
                  <div className='flex justify-between relative'>
                    <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type={showConfirmPassword ? 'text' : 'password'} placeholder='Masukkan password baru' id='confirm-password' className={`${confirmPassword.length > 0 && confirmPassword.length < 8 && 'wrong-input'} rounded-2xl h-full w-full pl-4 py-3 border`}/>
                    <button type='button' className='py-3 px-4 rounded-2xl absolute right-0 h-full toggle-password' title='toggle-password' onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                      {showConfirmPassword
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
                    : 'Simpan Password'
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

ResetPassword.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default ResetPassword
