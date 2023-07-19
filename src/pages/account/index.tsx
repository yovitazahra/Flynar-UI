import { useEffect, useState, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FiEdit3, FiSettings, FiLogOut } from 'react-icons/fi'
import DefaultLayout from '@/layouts/default'
import MenuHeader from '@/components/MenuHeader'
import Header from '@/components/Header'
import ShortMessage from '@/components/ShortMessage'
import type { RootState } from '@/store/index'
import { asyncUpdateAuthUser, asyncUnsetAuthUser } from '@/store/authUser/action'
import { setMessageActionCreator, unsetMessageActionCreator } from '@/store/message/action'
import { setLoadingTrueActionCreator, setLoadingFalseActionCreator } from '@/store/isLoading/action'
import api from '@/utils/api'

const Account = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()

  const message: Record<string, any> | null = useSelector((state: RootState) => state.message)
  const authUser: Record<string, any> | null = useSelector((state: RootState) => state.authUser)
  const isLoading: boolean = useSelector((state: RootState) => state.isLoading)

  useEffect(() => {
    if (authUser === null) {
      void fetchUser()
    } else {
      setName(authUser.name)
      setPhoneNumber(authUser.phoneNumber)
      setEmail(authUser.email)
    }
  }, [])

  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (message !== null) {
      dispatch(unsetMessageActionCreator())
    }
  }, [name, phoneNumber])

  const fetchUser = async (): Promise<void> => {
    dispatch(unsetMessageActionCreator())
    dispatch(setLoadingTrueActionCreator())
    const response = await api.getProfile()
    if (response instanceof Error) {
      if (axios.isAxiosError(response)) {
        if (response.response?.data?.message !== undefined && response.response?.data?.message !== null) {
          if (response.response.data.message === 'Silahkan Login') {
            dispatch(setMessageActionCreator({ error: true, text: response.response.data.message }))
            setTimeout(() => {
              void router.push('/login')
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
      setName(response.data.name)
      setPhoneNumber(response.data.phoneNumber)
      setEmail(response.data.email)
    }
    dispatch(setLoadingFalseActionCreator())
  }

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    dispatch(unsetMessageActionCreator())
    dispatch(setLoadingTrueActionCreator())
    const response = await dispatch(asyncUpdateAuthUser(name, phoneNumber))
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
      dispatch(setMessageActionCreator({ error: false, text: 'Profil Berhasil Diubah' }))
    }
    dispatch(setLoadingFalseActionCreator())
  }

  const logout = async (): Promise<void> => {
    const response = dispatch(asyncUnsetAuthUser())
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
      dispatch(setMessageActionCreator({ error: false, text: 'Terima Kasih' }))
      setTimeout(() => {
        void router.push('/')
      }, 1500)
    }
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div id='account-page' className=''>
        <Header isLoggedIn={authUser} login={async () => {}}/>
        <main className='mx-auto'>
          <MenuHeader pageTitle={'Akun'} />
          <div className='container flex justify-center flex-col gap-y-4 lg:flex-row lg:gap-y-0 w-4/5 mx-auto gap-x-8'>
            <div className='lg:w-2/5 flex flex-col'>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4'>
                  <FiEdit3 />
                  Ubah Profil
                </button>
              </div>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4'>
                  <FiSettings />
                  Pengaturan Akun
                </button>
              </div>
              <div className='border-b-2'>
                <button className='flex gap-x-2 items-center py-4' onClick={() => { void logout() }}>
                  <FiLogOut />
                  Keluar
                </button>
              </div>
              <ShortMessage message={message} />
            </div>
            <div className='lg:w-3/5'>
              <div className='border-2'>
                <div className='p-6'>
                  <p className='font-bold'>Ubah Data Profil</p>
                  <div className='pt-5'>
                    <div className='bg-blue-700 text-white px-4 py-2 rounded-t-[10px] mb-4'>Data Diri</div>
                    <div className='px-3 pt-3'>
                      <form className='flex flex-col gap-y-6' onSubmit={(e) => { void updateProfile(e) } } action=''>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='name'>Nama Lengkap</label>
                          <input type='name' value={name} id='name' onChange={(e) => { setName(e.target.value) }} className='w-full border rounded-md p-2' placeholder='' required/>
                        </div>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='tel'>Nomor Telepon</label>
                          <input type='number' value={phoneNumber} id='tel' onChange={(e) => { setPhoneNumber(e.target.value) }} className='w-full border rounded-md p-2' placeholder='' required/>
                        </div>
                        <div>
                          <label className='block mb-2 font-bold' htmlFor='email'>Email</label>
                          <input type='email' value={email} id='email' onChange={(e) => { setEmail(e.target.value) }} className='w-full border rounded-md p-2 bg-gray-100' placeholder='' required disabled={true}/>
                        </div>
                        <div className='flex justify-center'>
                          <button type='submit' className={`text-white font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-700'}`} disabled={isLoading}>
                            {
                              isLoading
                                ? 'Tunggu Sebentar'
                                : 'Simpan'
                            }
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

Account.getLayout = function getLayout (page: ReactElement) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export default Account
