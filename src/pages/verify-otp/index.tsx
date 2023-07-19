import { type ReactElement, useState, useEffect, type SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import AuthPageLayout from '@/layouts/auth'
import OtpInput from '@/components/OtpInput'
import ShortMessage from '@/components/ShortMessage'
import type { RootState } from '@/store/index'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const VerifyOtp = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)
  const [loggedEmail, setLoggedEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [startCountdown, setStartCountdown] = useState<SetStateAction<any>>(null)

  let secondTimer: any
  let countdown = 60

  const onChangeOtp = (value: string): void => { setOtp(value) }

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }
  }, [otp])

  useEffect(() => {
    void setLoggedEmailFromCookie()
  }, [])

  useEffect(() => {
    void resendOtp()
  }, [loggedEmail])

  const setLoggedEmailFromCookie = async (): Promise<void> => {
    const email: any = getCookie('loggedEmail')
    if (email !== undefined && email !== null && email !== '') {
      setLoggedEmail(email)
    } else {
      dispatch(setMessageActionCreator({ error: true, text: 'Silahkan Login' }))
      setTimeout(() => {
        void router.push('/login')
      }, 2500)
    }
  }

  const resendOtp = async (): Promise<void> => {
    dispatch(unsetMessageActionCreator())
    dispatch(setLoadingTrueActionCreator())
    setStartCountdown(null)
    if (loggedEmail !== '') {
      const response = await api.resendOtp(loggedEmail)
      if (response instanceof Error) {
        if (axios.isAxiosError(response)) {
          if (response.response?.data?.message !== undefined && response.response?.data?.message !== null) {
            if (response.response?.data.message === 'Email Sudah Diverifikasi') {
              dispatch(setMessageActionCreator({ error: true, text: `Email ${loggedEmail} Sudah Diverifikasi` }))
              setTimeout(() => {
                void router.push('/login')
              }, 2000)
            }
          } else {
            dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
          }
        } else {
          dispatch(setMessageActionCreator({ error: true, text: 'Kesalahan Pada Server, Coba Lagi' }))
        }
      } else {
        dispatch(setMessageActionCreator({ error: false, text: response.message }))
        const interval = setInterval(() => {
          secondTimer = document?.querySelector('.second-timer')
          if (secondTimer !== undefined && secondTimer !== null) {
            countdown--
            secondTimer.innerHTML = countdown.toString()
          }
        }, 1000)
        setStartCountdown(true)
        setTimeout(() => {
          setStartCountdown(false)
          clearInterval(interval)
          countdown = 60
        }, 60000)
      }
    }
    dispatch(setLoadingFalseActionCreator())
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())
    dispatch(setLoadingTrueActionCreator())

    if (otp.length < 6) {
      dispatch(setMessageActionCreator({ error: true, text: 'Lengkapi Kode OTP' }))
    }

    if (loggedEmail !== '') {
      const response = await api.verifyOtp(loggedEmail, parseInt(otp))
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
        setTimeout(() => {
          void router.push('/login')
        }, 2000)
      }
    }
    dispatch(setLoadingFalseActionCreator())
  }

  return (
    <>
      <Head>
        <title>Verify OTP</title>
        <meta name='description' content='Verify Your account with OTP' />
      </Head>
      <div id='verify-otp-page' className='h-screen overflow-hidden flex flex-col'>
        <header className='w-full bg-white h-20 shadow-md'>
          <div className='h-full container px-12 flex'>
            <Image src='/images/flynar-logo.png' width={200} height={200} priority={true} alt='Flynar Logo' className='h-full w-auto'/>
          </div>
        </header>
        <div className='w-full px-6 py-4 lg:p-0 mt-10'>
          <form action='' autoComplete='off' onSubmit={(e) => { void handleSubmit(e) } } className='flex'>
            <div className='mx-auto text-center flex flex-col gap-y-6'>
              {
                loggedEmail !== '' && !isLoading
                  ? <p>Ketik 6 digit kode yang dikirimkan ke <span className='font-bold'>{loggedEmail}</span></p>
                  : <p>Verifikasi OTP</p>
              }
              {
                startCountdown === true
                  ? <p>Anda dapat meminta ulang OTP dalam <span className='second-timer'></span> detik</p>
                  : startCountdown === false
                    ? <button type='button' onClick={() => { void resendOtp() }} className='text-white rounded-2xl px-6 py-3 text-sm bg-purple-600 w-fit mx-auto'>Kirim Ulang</button>
                    : <p>Tekan tombol di posisi ini untuk meminta kode OTP</p>
              }
              <OtpInput value={otp} valueLength={6} onChange={onChangeOtp} />
              <button type='submit' className={`w-full text-white rounded-2xl px-6 py-3 text-sm ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600'}`} disabled={isLoading}>
                {
                  isLoading
                    ? 'Tunggu Sebentar'
                    : 'Verifikasi'
                }
              </button>
              <ShortMessage message={message} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

VerifyOtp.getLayout = function getLayout (page: ReactElement) {
  return (
    <AuthPageLayout>
      {page}
    </AuthPageLayout>
  )
}

export default VerifyOtp
